import { Request, Response } from 'express'
import connection from '../db/connection'

export const getFormatoConsulta = (req: Request, res: Response) => {
    const { id } = req.params
    connection.query("SELECT * FROM adm_consulta_formato WHERE id = ?", id, (err, data) => {
        if (err) throw err;
        res.json(data[0])
    })
}

export const postFormatoConsulta = (req: Request, res: Response) => {
    const { body } = req
    connection.query("INSERT INTO adm_consulta_formato SET ?", [body], (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Formato de consulta agregada con éxito'
        })
    })
}

export const putFormatoConsulta = (req: Request, res: Response) => {
    const { body } = req
    const { id } = req.params

    connection.query("UPDATE adm_consulta_formato SET ? WHERE id = ?", [body, id], (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Formato de consulta actualizado con éxito'
        })
    })
}