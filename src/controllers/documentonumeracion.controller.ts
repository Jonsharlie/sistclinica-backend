import { Request, Response } from 'express'
import connection from '../db/connection'

export const getNumeracion = (req: Request, res: Response) => {
    const { id_tipo_documento } = req.params
    console.log('id_tipo_documento', id_tipo_documento)
    connection.query("SELECT * FROM gen_documento_numeracion WHERE id_tipo_documento = ?", id_tipo_documento, (err, data) => {
        if (err) throw err;
        res.json(data[0])
    })
}