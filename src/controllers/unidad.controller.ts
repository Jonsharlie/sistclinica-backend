import { Request, Response } from 'express'
import connection from '../db/connection'

export const getUnidades = (req: Request, res: Response) => {
    connection.query("SELECT * FROM gen_unidad", (err, data) => {
        if( err) throw err;
        res.json(data)
    })
}

export const getUnidad = (req: Request, res: Response) => {
    const {id} = req.params
    connection.query("SELECT * FROM gen_unidad WHERE id = ?", id, (err, data) => {
        if (err) throw err;
        res.json(data[0])
    })
}

export const deleteUnidad = (req: Request, res: Response) => {
    const {id} = req.params
    connection.query("DELETE FROM gen_unidad WHERE id = ?", id, (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Unidad eliminada con éxito'
        })
    })
}

export const postUnidad = (req: Request, res: Response) => {
    const { body } = req
    connection.query("INSERT INTO gen_unidad SET ?", [body], (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Unidad agregada con éxito'
        })
    })
}

export const putUnidad = (req: Request, res: Response) => {
    const { body } = req
    const { id } = req.params

    connection.query("UPDATE gen_unidad SET ? WHERE id = ?", [body, id], (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Unidad actualizada con éxito'
        })
    })
}
