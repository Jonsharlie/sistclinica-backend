import { Request, Response } from 'express'
import connection from '../db/connection'

export const getTrabajadores = (req: Request, res: Response) => {
    let sql = "select gtrab.id, gtrab.id_tipo_documento, gtrab.id_cargo, gtrab.apellido_paterno, ";
    sql += "gtrab.apellido_materno, gtrab.nombres, gtrab.fecha_nacimiento, gtrab.nro_documento, ";
    sql += "gtrab.numero_colegiatura, gtrab.ruc, gtrab.numero_telefono, gtrab.direccion, gtrab.email, ";
    sql += "gtrab.sexo, gtrab.estado, gtipodoc.nombre as nombre_tipodocumento, ";
    sql += "gtipodoc.abreviatura as abreviatura_tipodocumento, gcargo.nombre as nombre_cargo ";
    sql += "from gen_trabajador gtrab inner join gen_tipodocumento gtipodoc on gtrab.id_tipo_documento = gtipodoc.id ";
    sql += "inner join gen_cargo gcargo on gtrab.id_cargo = gcargo.id";

    connection.query(sql, (err, data) => {
        if (err) throw err;
        res.json(data)
    })
}

export const getTrabajadoresPorCargo = (req: Request, res: Response) => {
    const {idCargo} = req.params
    /*
    let sql = "SELECT id, id_tipo_documento, id_cargo, apellido_paterno, apellido_materno, ";
    sql += "nombres, fecha_nacimiento, nro_documento, numero_colegiatura, numero_telefono, ";
    sql += "direccion, email, sexo, estado FROM gen_trabajador ";
    sql += "WHERE id_cargo = ?";
    */
    let sql = "select gtrab.id, gtrab.id_tipo_documento, gtrab.id_cargo, gtrab.apellido_paterno, ";
    sql += "gtrab.apellido_materno, gtrab.nombres, gtrab.fecha_nacimiento, gtrab.nro_documento, ";
    sql += "gtrab.numero_colegiatura, gtrab.ruc, gtrab.numero_telefono, gtrab.direccion, gtrab.email, ";
    sql += "gtrab.sexo, gtrab.estado, gtipodoc.nombre as nombre_tipodocumento, ";
    sql += "gtipodoc.abreviatura as abreviatura_tipodocumento, gcargo.nombre as nombre_cargo ";
    sql += "from gen_trabajador gtrab inner join gen_tipodocumento gtipodoc on gtrab.id_tipo_documento = gtipodoc.id ";
    sql += "inner join gen_cargo gcargo on gtrab.id_cargo = gcargo.id ";
    sql += "where gtrab.id_cargo = ?";

    connection.query(sql, idCargo, (err, data) => {
        if (err) throw err;
        res.json(data)
    })
}

export const getTrabajador = (req: Request, res: Response) => {
    console.log('params in getPaciente', req.params)
    const { id } = req.params
    connection.query("SELECT * FROM gen_trabajador WHERE id = ?", id, (err, data) => {
        if (err) throw err;
        res.json(data[0])
    })
}

export const deleteTrabajador = (req: Request, res: Response) => {
    const { id } = req.params
    connection.query("DELETE FROM gen_trabajador WHERE id = ?", id, (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Trabajador eliminado con éxito'
        })
    })
}

export const postTrabajador = (req: Request, res: Response) => {
    const { body } = req
    connection.query("INSERT INTO gen_trabajador SET ?", [body], (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Trabajador agregado con éxito'
        })
    })
}

export const putTrabajador = (req: Request, res: Response) => {
    const { body } = req
    const { id } = req.params

    connection.query("UPDATE gen_trabajador SET ? WHERE id = ?", [body, id], (err, data) => {
        if (err) throw err;
        res.json({
            msg: "Trabajador actualizado con éxito"
        })
    })
}