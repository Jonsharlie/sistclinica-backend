import { Request, Response } from 'express'
import connection from '../db/connection'

export const getProveedores = (req: Request, res: Response) => {
    const {isSistema} = req.params
    console.log('isSistema', isSistema)
    let sql = "select gprov.id, gprov.id_area, gprov.nombre, gprov.direccion, ";
    sql += "gprov.telefono, gprov.representante, gprov.estado, garea.nombre as nombre_area ";
    sql += "from gen_proveedor gprov left join gen_area garea on gprov.id_area = garea.id ";
    sql += "where gprov.sistema = ? "
    sql += "order by gprov.nombre asc";
    console.log('sql proveedores', sql)

    connection.query(sql, isSistema, (err, data) => {
        if (err) throw err;
        res.json(data)
    })
}

export const getProveedoresPorArea = (req: Request, res: Response) => {
    const {id_area} = req.params
    connection.query("SELECT id, id_area, nombre, direccion, telefono, representante, estado FROM gen_proveedor WHERE id_area = ? and estado = 1", id_area, (err, data) => {
        if (err) throw err;
        res.json(data)
    })
}

export const getProveedor = (req: Request, res: Response) => {
    const sql = "SELECT * FROM gen_proveedor WHERE id = ?"
    const {id} = req.params
    console.log('sql getProveedor', sql)
    console.log('id proveedor', id)
    connection.query(sql, id, (err, data) => {
        if (err) throw err;
        res.json(data[0])
    })
}

export const postProveedor = (req: Request, res: Response) => {
    const { body } = req
    connection.query("INSERT INTO gen_proveedor SET ?", [body], (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Proveedor agregado con éxito'
        })
    })
}

export const deleteProveedor = (req: Request, res: Response) => {
    const { id } = req.params
    connection.query("DELETE FROM gen_proveedor WHERE id = ?", id, (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Proveedor eliminado con éxito'
        })
    })
}

export const putProveedor = (req: Request, res: Response) => {
    const { body } = req
    const { id } = req.params

    connection.query("UPDATE gen_proveedor SET ? WHERE id = ?", [body, id], (err, data) => {
        if (err) throw err;
        res.json({
            msg: "Proveedor actualizado con éxito"
        })
    })
}