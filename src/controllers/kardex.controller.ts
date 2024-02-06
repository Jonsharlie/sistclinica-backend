import { Request, Response } from 'express'
import connection from '../db/connection'

export const getKardex = (re: Request, res: Response) => {
    let sql = "select kdx.id, kdx.id_producto, kdx.id_area, kdx.id_tipomovimiento, kdx.codigo_producto, ";
    sql += "kdx.nombre_producto, kdx.entrada, kdx.salida, kdx.id_tipodocumento, kdx.numero_documento, ";
    sql += "kdx.detalle_movimiento, kdx.numero_serie, kdx.numero_correlativo, kdx.id_puntoventa, kdx.ejercicio, ";
    sql += "kdx.periodo ";
    sql += "from kardex kdx inner join gen_producto gprod on kdx.id_producto = gprod.id ";
    sql += "inner join gen_area garea on kdx.id_area = garea.id ";
    sql += "inner join gen_tipomovimiento gtipomov on kdx.id_tipomovimiento = gtipomov.id ";
    sql += "inner join gen_puntoventa gptoventa on kdx.id_puntoventa = gptoventa.id";

    connection.query(sql, (err, data) => {
        if (err) throw err;
        res.json(data)
    })
}

export const getMovimientosPorProducto = (req: Request, res: Response) => {
    const { id_producto } = req.params
    let sql = "select k.id, k.id_producto, k.id_area, k.id_tipomovimiento, k.id_operacion, ";
    sql += "k.id_tipodocumento, k.id_puntoventa, k.id_almacen, k.nombre_producto, k.entrada, ";
    sql += "k.salida, k.cantidad, k.detalle_movimiento, k.numero_serie, k.numero_correlativo, ";
    sql += "garea.nombre as nombre_area, gtipomov.nombre as nombre_tipomovimiento, ";
    sql += "gtipodoc.nombre as nombre_tipodocumento, gtipodoc.abreviatura as abrev_tipodocumento ";
    sql += "from kardex k ";
    sql += "inner join gen_area garea on k.id_area = garea.id ";
    sql += "inner join gen_tipomovimiento gtipomov on k.id_tipomovimiento = gtipomov.id ";
    sql += "inner join gen_tipodocumento gtipodoc on k.id_tipodocumento = gtipodoc.id ";
    sql += "where k.id_producto = ?";
    connection.query(sql, id_producto, (err, data) => {
        if (err) throw err;
        res.json(data)
    })
} 

export const postKardex = (req: Request, res: Response) => {
    const { body } = req
    connection.query("INSERT INTO kardex SET ?", [body], (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Kardex agregadp con éxito'
        })
    })
}