import { Request, Response } from 'express'
import connection from '../db/connection'

export const getProductos = (req: Request, res: Response) => {
    let sql = "select gprod.id, gprod.codigo, gprod.nombre, gprod.id_principioactivo, gprod.id_categoria, ";
    sql += "gprod.id_laboratorio, gprod.id_area, gprod.id_unidad, gprod.id_unidad_frac, gprod.capacidad, gprod.igv, ";
    sql += "gprod.utilidad, gprod.codigo_gtin, gprod.precio_costo, gprod.precio_venta, gprod.stock_min, gprod.stock_max, gprod.stock, ";
    sql += "gprod.venta, gprod.insumo, gprod.maneja_lote, gprod.estado, ";
    sql += "fprinactivo.nombre as nombre_principioactivo, ";
    sql += "garea.nombre as nombre_area, gunientero.nombre as nombre_unidadentero, ";
    sql += "gunifrac.nombre as nombre_unidadfrac, ";
    sql += "t.precio_costo_entero, t.precio_costo_fraccion, t.precio_venta_entero, t.precio_venta_fraccion ";
    sql += "from gen_producto gprod left join far_principioactivo fprinactivo on gprod.id_principioactivo = fprinactivo.id ";
    sql += "left join gen_area garea on gprod.id_area = garea.id ";
    sql += "left join gen_unidad gunientero on gprod.id_unidad = gunientero.id ";
    sql += "left join gen_unidad gunifrac on gprod.id_unidad_frac = gunifrac.id ";
    sql += "left join ( ";
    sql += "select id_producto, precio_costo_entero, precio_costo_fraccion, precio_venta_entero, precio_venta_fraccion, fecha_registro, ";
    sql += "max(fecha_registro) ";
    sql += "from precio group by id_producto ";
    sql += ") as t on t.id_producto = gprod.id";
    console.log('sql getProductos', sql)
    connection.query(sql, (err, data) => {
        if (err) throw err;
        res.json(data)
    })
}

export const getProductosPorArea = (req: Request, res: Response) => {
    const { id_area } = req.params
    let sql = "select gprod.id, gprod.codigo, gprod.nombre, gprod.id_principioactivo, gprod.id_categoria, ";
    sql += "gprod.id_laboratorio, gprod.id_area, gprod.id_unidad, gprod.id_unidad_frac, gprod.capacidad, gprod.igv, ";
    sql += "gprod.utilidad, gprod.codigo_gtin, gprod.precio_costo, gprod.precio_venta, gprod.stock_min, gprod.stock_max, gprod.stock, ";
    sql += "gprod.venta, gprod.insumo, gprod.maneja_lote, gprod.estado, ";
    sql += "fprinactivo.nombre as nombre_principioactivo, ";
    sql += "garea.nombre as nombre_area, gunientero.nombre as nombre_unidadentero, ";
    sql += "gunifrac.nombre as nombre_unidadfrac ";
    sql += "from gen_producto gprod left join far_principioactivo fprinactivo on gprod.id_principioactivo = fprinactivo.id ";
    sql += "left join gen_area garea on gprod.id_area = garea.id ";
    sql += "left join gen_unidad gunientero on gprod.id_unidad = gunientero.id ";
    sql += "left join gen_unidad gunifrac on gprod.id_unidad_frac = gunifrac.id ";
    sql += "where gprod.id_area = ?";

    connection.query(sql, id_area, (err, data) => {
        if (err) throw err;
        res.json(data)
    })
}

export const getProductosPorBusqueda = (req: Request, res: Response) => {
    const { filter } = req.params
    console.log('filter', filter)
    let sql = "select gprod.id, gprod.codigo, gprod.nombre, gprod.id_principioactivo, gprod.id_categoria, ";
    sql += "gprod.id_laboratorio, gprod.id_area, gprod.id_unidad, gprod.id_unidad_frac, gprod.capacidad, gprod.igv, ";
    sql += "gprod.utilidad, gprod.codigo_gtin, gprod.precio_costo, gprod.precio_venta, gprod.stock_min, gprod.stock_max, gprod.stock, ";
    sql += "gprod.venta, gprod.insumo, gprod.maneja_lote, gprod.estado, ";
    sql += "fprinactivo.nombre as nombre_principioactivo, ";
    sql += "garea.nombre as nombre_area, gunientero.nombre as nombre_unidadentero, ";
    sql += "gunifrac.nombre as nombre_unidadfrac ";
    sql += "from gen_producto gprod left join far_principioactivo fprinactivo on gprod.id_principioactivo = fprinactivo.id ";
    sql += "left join gen_area garea on gprod.id_area = garea.id ";
    sql += "left join gen_unidad gunientero on gprod.id_unidad = gunientero.id ";
    sql += "left join gen_unidad gunifrac on gprod.id_unidad_frac = gunifrac.id ";

    connection.query(sql, '', (err, data) => {
        if (err) throw err;
        res.json(data)
    })
}

export const getProductosPorAreaActivos = (req: Request, res: Response) => {
    const { id_area } = req.params
    let sql = "select gprod.id, gprod.codigo, gprod.nombre, gprod.id_principioactivo, gprod.id_categoria, ";
    sql += "gprod.id_laboratorio, gprod.id_area, gprod.id_unidad, gprod.id_unidad_frac, gprod.capacidad, gprod.igv, ";
    sql += "gprod.utilidad, gprod.codigo_gtin, gprod.precio_costo, gprod.precio_venta, gprod.stock_min, gprod.stock_max, gprod.stock, ";
    sql += "gprod.venta, gprod.insumo, gprod.maneja_lote, gprod.estado, ";
    sql += "fprinactivo.nombre as nombre_principioactivo, ";
    sql += "garea.nombre as nombre_area, gunientero.nombre as nombre_unidadentero, ";
    sql += "gunifrac.nombre as nombre_unidadfrac ";
    sql += "from gen_producto gprod left join far_principioactivo fprinactivo on gprod.id_principioactivo = fprinactivo.id ";
    sql += "left join gen_area garea on gprod.id_area = garea.id ";
    sql += "left join gen_unidad gunientero on gprod.id_unidad = gunientero.id ";
    sql += "left join gen_unidad gunifrac on gprod.id_unidad_frac = gunifrac.id ";
    sql += "where gprod.id_area = ? and gprod.estado = 1";

    connection.query(sql, id_area, (err, data) => {
        if (err) throw err;
        res.json(data)
    })
}

export const getProducto = (req: Request, res: Response) => {
    const { id } = req.params
    let sql = "select gprod.id, gprod.codigo, gprod.nombre, gprod.id_principioactivo, gprod.id_categoria, ";
    sql += "gprod.id_laboratorio, gprod.id_area, gprod.id_unidad, gprod.id_unidad_frac, gprod.capacidad, gprod.igv, ";
    sql += "gprod.utilidad, gprod.codigo_gtin, gprod.precio_costo, gprod.precio_venta, gprod.stock_min, gprod.stock_max, gprod.stock, ";
    sql += "gprod.venta, gprod.insumo, gprod.maneja_lote, gprod.estado, ";
    sql += "fprinactivo.nombre as nombre_principioactivo, ";
    sql += "garea.nombre as nombre_area, gunientero.nombre as nombre_unidadentero, ";
    sql += "gunifrac.nombre as nombre_unidadfrac ";
    sql += "from gen_producto gprod left join far_principioactivo fprinactivo on gprod.id_principioactivo = fprinactivo.id ";
    sql += "left join gen_area garea on gprod.id_area = garea.id ";
    sql += "left join gen_unidad gunientero on gprod.id_unidad = gunientero.id ";
    sql += "left join gen_unidad gunifrac on gprod.id_unidad_frac = gunifrac.id ";
    sql += "where gprod.id = ?";
    
    connection.query(sql, id, (err, data) => {
        if (err) throw err;
        res.json(data[0])
    })
}

export const postProducto = (req: Request, res: Response) => {
    const { body } = req
    console.log('body postProducto', body)
    connection.query("INSERT INTO gen_producto SET ?", [body], (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Producto agregado con éxito'
        })
        /*
        const lastInsertId = data.insertId

        if (lastInsertId != undefined) {

            const bodyKardex = {
                id_producto: lastInsertId,
                id_area: 2,
                id_tipomovimiento: 1,
                nombre_producto: body.nombre,
                entrada: true,
                salida: false,
                cantidad: body.stock,
                detalle_movimiento: 'INVENTARIO INICIAL PROD: '+body.nombre,
                id_puntoventa: 1,
                ejercicio: 2024,
                periodo: 1
            }

            console.log('body kardex', bodyKardex)
    
            connection.query("INSERT INTO kardex SET ?", [bodyKardex], (err, data) => {
                if (err) throw err;
                res.json({
                    msg: 'Producto agregado con éxito'
                })
            })
        }
        */
    })
}

export const putProducto = (req: Request, res: Response) => {
    const { body } = req
    const { id } = req.params
    connection.query("UPDATE gen_producto SET ? WHERE id = ?", [body, id], (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Producto actualizado con éxito'
        })
    })
}