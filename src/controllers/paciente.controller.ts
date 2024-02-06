import { Request, Response } from 'express'
import connection from '../db/connection'

export const getPacientes = (req: Request, res: Response) => {
    let sql = "select apac.nro_historia, apac.nro_historia_fisica, apac.id_tipo_documento, apac.id_tipo_paciente, ";
    sql += "apac.apellido_paterno, apac.apellido_materno, apac.nombres, ";
    sql += "CONCAT(apac.apellido_paterno,' ',apac.apellido_materno,' ',nombres) as nombre_completo, ";
    sql += "apac.fecha_nacimiento, apac.nro_documento, ";
    sql += "apac.numero_telefono, apac.direccion, apac.sexo, gtipodoc.nombre as nombre_tipodocumento, ";
    sql += "gtipodoc.abreviatura as abreviatura_tipodocumento, "
    sql += "gtipopaci.nombre as nombre_tipopaciente, apac.estado ";
    sql += "from adm_paciente apac ";
    sql += "inner join gen_tipodocumento gtipodoc on apac.id_tipo_documento = gtipodoc.id ";
    sql += "inner join gen_tipopaciente gtipopaci on apac.id_tipo_paciente = gtipopaci.id";

    connection.query(sql, (err, data) => {
        if (err) throw err;
        res.json(data)
    })
}

export const getPaciente = (req: Request, res: Response) => {
    const { nro_historia } = req.params
    console.log('params in getPaciente', req.params)
    console.log('nro_historia', nro_historia)
    connection.query("SELECT * FROM adm_paciente WHERE nro_historia = ?", nro_historia, (err, data) => {
        if (err) throw err;
        res.json(data[0])
    })
}

export const deletePaciente = (req: Request, res: Response) => {
    const { nro_historia } = req.params
    connection.query("DELETE FROM adm_paciente WHERE nro_historia = ?", nro_historia, (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Paciente eliminado con éxito'
        })
    })
}

export const postPaciente = (req: Request, res: Response) => {
    const { body } = req
    connection.query("INSERT INTO adm_paciente SET ?", [body], (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Paciente agregado con éxito'
        })
    })
}

export const putPaciente = (req: Request, res: Response) => {
    const { body } = req
    const { nro_historia } = req.params

    connection.query("UPDATE adm_paciente SET ? WHERE nro_historia = ?", [body, nro_historia], (err, data) => {
        if (err) throw err;
        res.json({
            msg: "Paciente actualizado con éxito"
        })
    })
}