import { Request, Response } from 'express'
import connection from '../db/connection'

export const getUltimoPrecio = (req: Request, res: Response) => {
    const {id_producto} = req.params
    let sql = "select id_producto, precio_costo_entero, precio_costo_fraccion, ";
    sql += "precio_venta_entero, precio_venta_fraccion, fecha_registro, max(fecha_registro) ";
    sql += "from precio group by id_producto having id_producto = ?";
    console.log('sql getUltimoPrecio', sql)
    console.log('id_producto', id_producto)
    connection.query(sql, id_producto, (err, data) => {
        if (err) throw err;
        res.json(data[0])
    })
}