import { Request, Response } from 'express'
import connection from '../db/connection'

export const getConsultas = (req: Request, res: Response) => {
    let sql = "select acon.id, acon.id_tipo_paciente, acon.id_medico_consulta, acon.id_medico_atencion, ";
    sql += "acon.nro_historia, acon.nombre_paciente, ";
    sql += "acon.fecha_registro, acon.fecha_atencion, acon.fecha_reprograma, ";
    sql += "acon.estado_consulta, acon.tipo_atencion, acon.estado, acondetalle.id_especialidad, ";
    sql += "acondetalle.nombre_servicio, gtipopaci.nombre as nombre_tipopaciente, ";
    sql += "CONCAT(docconsulta.apellido_paterno,' ',docconsulta.apellido_materno,' ',docconsulta.nombres) as doctor_consulta, ";
    sql += "CONCAT(docatencion.apellido_paterno,' ',docatencion.apellido_materno,' ',docatencion.nombres) as doctor_atencion, ";
    sql += "gtiposerv.nombre as nombre_tiposervicio, apaci.fecha_nacimiento, ";
    sql += "acondetalle.monto_paciente as valor, aconformato.id as id_consultaformato ";
    sql += "from adm_consulta acon inner join gen_tipopaciente gtipopaci on acon.id_tipo_paciente = gtipopaci.id ";
    sql += "left join gen_trabajador docconsulta on acon.id_medico_consulta = docconsulta.id ";
    sql += "left join gen_trabajador docatencion on acon.id_medico_atencion = docatencion.id ";
    sql += "inner join gen_tiposervicio gtiposerv on acon.codigo_tiposervicio = gtiposerv.codigo ";
    sql += "inner join adm_paciente apaci on acon.nro_historia = apaci.nro_historia ";
    sql += "left join adm_consulta_detalle acondetalle on acondetalle.id_consulta = acon.id ";
    sql += "left join adm_consulta_formato aconformato on aconformato.id_consulta = acon.id ";
    sql += "where acondetalle.codigo_tiposervicio = 'AA' ";
    sql += "order by acon.fecha_registro desc ";
    console.log('sql getConsultas', sql)

    connection.query(sql, (err, data) => {
        if (err) throw err;
        res.json(data)
    })
}

export const getConsulta = (req: Request, res: Response) => {
    const { id } = req.params
    let sql = "select acon.id, acon.id_tipo_paciente, acon.id_medico_consulta, acon.id_medico_atencion, ";
    sql += "acon.nro_historia, acon.nombre_paciente, ";
    sql += "acon.fecha_registro, acon.fecha_atencion, acon.fecha_reprograma, ";
    sql += "acon.estado_consulta, acon.tipo_atencion, acon.estado, acondetalle.id_especialidad, ";
    sql += "acondetalle.nombre_servicio, gtipopaci.nombre as nombre_tipopaciente, ";
    sql += "CONCAT(docconsulta.apellido_paterno,' ',docconsulta.apellido_materno,' ',docconsulta.nombres) as doctor_consulta, ";
    sql += "CONCAT(docatencion.apellido_paterno,' ',docatencion.apellido_materno,' ',docatencion.nombres) as doctor_atencion, ";
    sql += "gtiposerv.nombre as nombre_tiposervicio, apaci.fecha_nacimiento, ";
    sql += "acondetalle.monto_paciente as valor, aconformato.id as id_consultaformato ";
    sql += "from adm_consulta acon inner join gen_tipopaciente gtipopaci on acon.id_tipo_paciente = gtipopaci.id ";
    sql += "left join gen_trabajador docconsulta on acon.id_medico_consulta = docconsulta.id ";
    sql += "left join gen_trabajador docatencion on acon.id_medico_atencion = docatencion.id ";
    sql += "inner join gen_tiposervicio gtiposerv on acon.codigo_tiposervicio = gtiposerv.codigo ";
    sql += "inner join adm_paciente apaci on acon.nro_historia = apaci.nro_historia ";
    sql += "left join adm_consulta_detalle acondetalle on acondetalle.id_consulta = acon.id ";
    sql += "left join adm_consulta_formato aconformato on aconformato.id_consulta = acon.id ";
    sql += "where acondetalle.codigo_tiposervicio = 'AA' and acon.id = ?";
    console.log('sql getConsulta', sql)

    connection.query(sql, id, (err, data) => {
        if (err) throw err;
        res.json(data[0])
    })
}

export const getHistorial = (req: Request, res: Response) => {
    const { nro_historia } = req.params
    let sql = "select acon.id, acon.id_tipo_paciente, acon.id_medico_consulta, acon.id_medico_atencion, ";
    sql += "acon.nro_historia, acon.nombre_paciente, acon.fecha_registro, acon.fecha_atencion, ";
    sql += "acon.fecha_reprograma, acon.estado_consulta, acon.tipo_atencion, acon.estado, ";
    sql += "acondetalle.id_especialidad, acondetalle.nombre_servicio, gtipopaci.nombre as nombre_tipopaciente, ";
    sql += "CONCAT(docconsulta.apellido_paterno,' ',docconsulta.apellido_materno,' ',docconsulta.nombres) as doctor_consulta, ";
    sql += "CONCAT(docatencion.apellido_paterno,' ',docatencion.apellido_materno,' ',docatencion.nombres) as doctor_atencion, ";
    sql += "gtiposerv.nombre as nombre_tiposervicio, apaci.fecha_nacimiento, acondetalle.monto_paciente as valor, ";
    sql += "aconformato.id as id_consultaformato, ";
    sql += "aconformato.detalle as detalle_consultaformato ";
    sql += "from adm_consulta acon inner join gen_tipopaciente gtipopaci on acon.id_tipo_paciente = gtipopaci.id ";
    sql += "left join gen_trabajador docconsulta on acon.id_medico_consulta = docconsulta.id ";
    sql += "left join gen_trabajador docatencion on acon.id_medico_atencion = docatencion.id ";
    sql += "inner join gen_tiposervicio gtiposerv on acon.codigo_tiposervicio = gtiposerv.codigo ";
    sql += "inner join adm_paciente apaci on acon.nro_historia = apaci.nro_historia ";
    sql += "left join adm_consulta_detalle acondetalle on acondetalle.id_consulta = acon.id ";
    sql += "left join adm_consulta_formato aconformato on aconformato.id_consulta = acon.id ";
    sql += "where acondetalle.codigo_tiposervicio = 'AA' and acon.nro_historia = ? and estado_consulta = 'FINALIZADO'";
    console.log('sql getHistorial', sql)
    connection.query(sql, nro_historia, (err, data) => {
        if (err) throw err;
        res.json(data)
    })
}

export const deleteConsulta = (req: Request, res: Response) => {
    const { id } = req.params
    connection.query("DELETE FROM gen_consulta WHERE id = ?", id, (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Consulta eliminada con éxito'
        })
    })
}

export const postConsulta = (req: Request, res: Response) => {
    const {
        id_tipo_paciente,
        id_especialidad,
        id_medico_consulta,
        nro_historia,
        codigo_tiposervicio,
        nombre_paciente,
        id_puntoventa,
        fecha_registro,
        coaseguro_seguro,
        coaseguro_paciente,
        estado_consulta,
        tipo_atencion,
        estado,
        detalle_consulta
    } = req.body

    const bodyConsulta = {
        id_tipo_paciente: id_tipo_paciente,
        id_medico_consulta: id_medico_consulta,
        nro_historia: nro_historia,
        codigo_tiposervicio: codigo_tiposervicio,
        nombre_paciente: nombre_paciente,
        id_puntoventa: id_puntoventa,
        fecha_registro: fecha_registro,
        coaseguro_seguro: coaseguro_seguro,
        coaseguro_paciente: coaseguro_paciente,
        estado_consulta: estado_consulta,
        tipo_atencion: tipo_atencion,
        estado: estado
    }

    console.log('req.body', req.body)
    console.log('bodyConsulta', bodyConsulta)

    connection.query("INSERT INTO adm_consulta SET ?", [bodyConsulta], (err, data) => {
        if (err) throw err;
        const lastInsertId = data.insertId

        const bodyDetalleConsulta = {
            id_consulta: lastInsertId,
            codigo_tiposervicio: detalle_consulta.codigo_tiposervicio,
            nombre_tiposervicio: detalle_consulta.nombre_tiposervicio,
            id_especialidad: id_especialidad,
            nombre_servicio: detalle_consulta.nombre_servicio,
            valor_servicio: detalle_consulta.valor_servicio,
            monto_seguro: detalle_consulta.monto_seguro,
            monto_paciente: detalle_consulta.monto_paciente,
            estado: detalle_consulta.estado
        }

        connection.query("INSERT INTO adm_consulta_detalle SET ?", [bodyDetalleConsulta], (err, data) => {
            if (err) throw err;
            res.json({
                msg: 'Consulta agregada con éxito'
            })
        })
    })
}

export const putConsulta = (req: Request, res: Response) => {
    const { body } = req
    const { id } = req.params

    connection.query("UPDATE adm_consulta SET ? WHERE id = ?", [body, id], (err, data) => {
        if (err) throw err;
        res.json({
            msg: "Consulta actualizada con éxito"
        })
    })
}

export const updateEstado = (req: Request, res: Response) => {
    const { estado_consulta } = req.body
    const { id } = req.params

    connection.query("UPDATE adm_consulta SET estado_consulta = ? WHERE id = ?", [estado_consulta, Number(id)], (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Estado actualizado correctamente'
        })
    })
}