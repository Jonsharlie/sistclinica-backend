import { Request, Response } from 'express'
import connection from '../db/connection'

export const postConsultaDetalle = (req: Request, res: Response) => {
    const { body } = req
    connection.query("INSERT INTO adm_consulta_detalle SET ?", [body], (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Detalle de consulta agregada con éxito'
        })
    })
} 