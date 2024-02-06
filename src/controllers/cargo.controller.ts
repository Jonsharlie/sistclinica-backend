import { Request, Response } from 'express'
import connection from '../db/connection'

export const getCargos = (req: Request, res: Response) => {
    connection.query("SELECT id, nombre, colegiatura, estado FROM gen_cargo", (err, data) => {
        if (err) throw err;
        res.json(data)
    })
}

export const getCargo = (req: Request, res: Response) => {
    const { id } = req.params
    connection.query("SELECT id, nombre, colegiatura, estado FROM gen_cargo WHERE id = ?", id, (err, data) => {
        if (err) throw err;
        res.json(data[0])
    })
}

export const postCargo = (req: Request, res: Response) => {
    const { body } = req
    connection.query("INSERT INTO gen_cargo SET ?", [body], (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Cargo agregado con éxito'
        })
    })
}

export const putCargo = (req: Request, res: Response) => {
    const { body } = req
    const { id } = req.params
    connection.query("UPDATE gen_cargo SET ? WHERE id = ?", [body, id], (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Cargo actualizado con éxito'
        })
    })
}

export const deleteCargo = (req: Request, res: Response) => {
    const { id } = req.params
    connection.query("DELETE FROM gen_cargo WHERE id = ?", id, (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Cargo eliminado con éxito'
        })
    })
}