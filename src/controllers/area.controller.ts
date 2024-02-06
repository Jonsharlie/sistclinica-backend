import { Request, Response } from 'express'
import connection from '../db/connection'

export const getAreas = (req: Request, res: Response) => {
    connection.query("SELECT id, nombre, abreviatura, estado FROM gen_area", (err, data) => {
        if( err) throw err;
        res.json(data)
    })
}

export const getArea = (req: Request, res: Response) => {
    const {id} = req.params
    connection.query("SELECT * FROM gen_area WHERE id = ?", id, (err, data) => {
        if (err) throw err;
        res.json(data[0])
    })
}

export const deleteArea = (req: Request, res: Response) => {
    const {id} = req.params
    connection.query("DELETE FROM gen_area WHERE id = ?", id, (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Área eliminada con éxito'
        })
    })
}

export const postArea = (req: Request, res: Response) => {
    const { body } = req
    connection.query("INSERT INTO gen_area SET ?", [body], (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Área agregada con éxito'
        })
    })
}

export const putArea = (req: Request, res: Response) => {
    const { body } = req
    const { id } = req.params

    connection.query("UPDATE gen_area SET ? WHERE id = ?", [body, id], (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Área actualizada con éxito'
        })
    })
}
