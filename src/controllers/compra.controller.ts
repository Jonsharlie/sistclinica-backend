import { Request, Response } from 'express'
import connection from '../db/connection'

export const getCompras = (req: Request, res: Response) => {
    let sql = "select fcom.id, fcom.serie, fcom.correlativo, fcom.tipo_pago, ";
    sql += "fcom.fecha_emision, fcom.fecha_pago, fcom.gravado, fcom.igv, ";
    sql += "fcom.subtotal, fcom.total, fcom.descuento, fcom.incluyeigv, fcom.estado ";
    sql += "from far_compra fcom";

    connection.query(sql, (err, data) => {
        if (err) throw err;
        res.json(data)
    })
}

export const getCompra = (req: Request, res: Response) => {
    const {id_compra} = req.params
    let sql = "select fcom.id, fcom.serie, fcom.correlativo, fcom.tipo_pago, ";
    sql += "fcom.fecha_emision, fcom.fecha_pago, fcom.gravado, fcom.igv, ";
    sql += "fcom.subtotal, fcom.total, fcom.descuento, fcom.incluyeigv, fcom.estado ";
    sql += "from far_compra fcom "
    sql += "where fcom.id = ?";

    connection.query(sql, id_compra, (err, data) => {
        if (err) throw err;
        res.json(data[0])
    })
}

export const postCompra = (req: Request, res: Response) => {
    const {
        serie,
        correlativo,
        id_proveedor,
        tipo_pago,
        id_puntoventa,
        id_tipo_documento,
        fecha_emision,
        fecha_pago,
        gravado,
        igv,
        subtotal,
        total,
        descuento,
        incluyeigv,
        estado
    } = req.body

    const bodyCompra = {
        serie,
        correlativo,
        id_proveedor,
        tipo_pago,
        id_puntoventa,
        id_tipo_documento,
        fecha_emision,
        fecha_pago,
        gravado,
        igv,
        subtotal,
        total,
        descuento,
        incluyeigv,
        estado
    }

    const { body } = req
    const { items, itemsKardex, precios } = body

    console.log('bodyCompra', bodyCompra)
    console.log('items compra', items)
    console.log('items kardex', itemsKardex)

    connection.query("INSERT INTO far_compra SET ?", [bodyCompra], (err, data) => {
        if (err) throw err;
        const lastInsertId = data.insertId

        if (lastInsertId !== undefined) {
            items.forEach(function(item:any) {
                const itemCompra = {
                    id_compra: lastInsertId,
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
    
                connection.query("INSERT INTO pivot_compra_producto SET ?", [itemCompra], (err, data) => {
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

            precios.forEach(function(item: any) {
                const itemPrecio = {
                    id_producto: item.id_producto,
                    id_unidad: item.id_unidad,
                    id_unidad_frac: item.id_unidad_frac,
                    precio_costo_entero: item.precio_costo_entero,
                    precio_costo_fraccion: item.precio_costo_fraccion,
                    precio_venta_entero: item.precio_venta_entero,
                    precio_venta_fraccion: item.precio_venta_fraccion,
                    estado: item.estado
                }

                connection.query("INSERT INTO precio SET ?", [itemPrecio], (err, data) => {
                    if (err) throw err;
                })
            }) 

            res.json({
                msg: 'Compra registrada con éxito'
            })
        }
    })
}