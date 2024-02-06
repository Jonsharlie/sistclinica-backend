import { Request, Response } from 'express'
import connection from '../db/connection'

export const getVentas = (req: Request, res: Response) => {
    let sql = "select gventa.id, gventa.id_tipo_documento, gventa.serie, gventa.correlativo, gventa.nombre_cliente, ";
    sql += "gventa.forma_pago, gventa.tipo_pago, gventa.fecha_registro, gventa.gravado, gventa.igv, gventa.subtotal, gventa.total, ";
    sql += "gventa.descuento, gventa.incluyeigv, gventa.estado, gtipodoc.nombre as nombre_tipodocumento ";
    sql += "from gen_venta gventa inner join gen_tipodocumento gtipodoc on gventa.id_tipo_documento = gtipodoc.id ";
    sql += "order by gventa.fecha_registro desc";

    connection.query(sql, (err, data) => {
        if (err) throw err;
        res.json(data)
    })
}

export const getVenta = (req: Request, res: Response) => {
    const {id_venta} = req.params
    let sql = "select gventa.id, gventa.id_tipo_documento, gventa.serie, gventa.correlativo, gventa.nombre_cliente, ";
    sql += "gventa.forma_pago, gventa.tipo_pago, gventa.fecha_registro, gventa.gravado, gventa.igv, gventa.subtotal, gventa.total, ";
    sql += "gventa.descuento, gventa.incluyeigv, gventa.estado, gtipodoc.nombre as nombre_tipodocumento ";
    sql += "from gen_venta gventa inner join gen_tipodocumento gtipodoc on gventa.id_tipo_documento = gtipodoc.id ";
    sql += "order by gventa.fecha_registro desc "
    sql += "where gventa.id = ?";

    connection.query(sql, id_venta, (err, data) => {
        if (err) throw err;
        res.json(data[0])
    })
}

export const postVenta = (req: Request, res: Response) => {
    const {
        id_tipo_documento,
        id_puntoventa,
        serie,
        correlativo,
        nombre_cliente,
        forma_pago,
        tipo_pago,
        fecha_registro,
        gravado,
        igv,
        subtotal,
        total,
        descuento,
        incluyeigv,
        estado
    } = req.body

    const bodyVenta = {
        id_tipo_documento,
        id_puntoventa,
        serie,
        correlativo,
        nombre_cliente,
        forma_pago,
        tipo_pago,
        fecha_registro,
        gravado,
        igv,
        subtotal,
        total,
        descuento,
        incluyeigv,
        estado
    }

    const { body } = req
    const { items, itemsKardex } = body

    console.log('bodyVenta', bodyVenta)
    console.log('items venta', items)
    console.log('items kardex', itemsKardex)

    connection.query("INSERT INTO gen_venta SET ?", [bodyVenta], (err, data) => {
        if (err) throw err;
        const lastInsertId = data.insertId

        if (lastInsertId !== undefined) {
            items.forEach(function(item:any) {
                const itemVenta = {
                    id_venta: lastInsertId,
                    id_producto: item.id_producto,
                    nombre_producto: item.nombre_producto,
                    id_unidad: item.id_unidad,
                    cantidad: item.cantidad,
                    precio_unitario: item.precio_unitario,
                    descuento: item.descuento,
                    precio_final: item.precio_final,
                    gravado: item.gravado,
                    igv: item.igv,
                    subtotal: item.subtotal,
                    total: item.total,
                    incluyeigv: item.incluyeigv,
                    estado: item.estado
                }
    
                connection.query("INSERT INTO pivot_producto_venta SET ?", [itemVenta], (err, data) => {
                    if (err) throw err;
                })
            });

            itemsKardex.forEach(function(item: any) {
                const itemKardex = {
                    id_producto: item.id_producto,
                    id_area: item.id_area,
                    id_tipomovimiento: item.id_tipomovimiento,
                    id_operacion: lastInsertId,
                    id_tipodocumento: item.id_tipodocumento,
                    id_puntoventa: item.id_puntoventa,
                    id_almacen: item.id_almacen,
                    nombre_producto: item.nombre_producto,
                    entrada: item.entrada,
                    salida: item.salida,
                    cantidad: item.cantidad,
                    detalle_movimiento: item.detalle_movimiento,
                    numero_serie: item.numero_serie,
                    numero_correlativo: item.numero_correlativo,
                    ejercicio: item.ejercicio,
                    periodo: item.periodo,
                    estado: item.estado
                }

                connection.query("INSERT INTO kardex SET ?", [itemKardex], (err, data) => {
                    if (err) throw err;
                })
            })

            const siguienteCorrelativoNumber = parseInt(bodyVenta.correlativo) + 1

            const siguienteCorrelativo = siguienteCorrelativoNumber.toString().padStart(6, '0')

            connection.query(
                "UPDATE gen_documento_numeracion SET correlativo = ? WHERE id_tipo_documento = ? and serie = ?", 
                [siguienteCorrelativo, id_tipo_documento, serie],
                (err, data) => {
                    if (err) throw err;
                })

            res.json({
                msg: 'Venta registrada con éxito'
            })
        }
    })
}