import { Request, Response } from 'express'
import connection from '../db/connection'

export const getUsuarios = (req: Request, res: Response) => {
    let sql = "select ausuario.id, ausuario.id_trabajador, ausuario.id_cargo, ";
    sql += "CONCAT(ausuario.nombres,' ',ausuario.apellidos) as nombre_completo, ausuario.email, ";
    sql += "gtrabajador.nro_documento, gtrabajador.numero_telefono, gcargo.nombre as nombre_cargo ";
    sql += "from acl_usuario ausuario inner join gen_trabajador gtrabajador on ausuario.id_trabajador = gtrabajador.id ";
    sql += "inner join gen_cargo gcargo on ausuario.id_cargo = gcargo.id";
    console.log('getUsuarios', getUsuarios)
    connection.query(sql, (err, data) => {
        if (err) throw err;
        res.json(data)
    })
}

export const getUsuario = (req: Request, res: Response) => {
    console.log('params in getUsuario', req.params)
    const { id } = req.params
    connection.query("SELECT * FROM acl_usuario WHERE id = ?", id, (err, data) => {
        if (err) throw err;
        res.json(data[0])
    })
}

export const validarAcceso = (req: Request, res: Response) => {
    const { body } = req
    console.log('body validarAcceso', body)
    connection.query("SELECT * FROM acl_usuario WHERE login = ? and password = ?", [body.login, body.password], (err, data) => {
        if (err) throw err;
        res.json(data[0])
    })
}

export const postUsuario = (req: Request, res: Response) => {
    const { body } = req
    connection.query("INSERT INTO acl_usuario SET ?", [body], (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Usuario agregado con éxito'
        })
    })
}