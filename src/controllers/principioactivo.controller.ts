import { Request, Response } from 'express'
import connection from '../db/connection'

export const getPrincipios = (req: Request, res: Response) => {
    connection.query("SELECT id, nombre, estado FROM far_principioactivo", (err, data) => {
        if (err) throw err;
        res.json(data)
    })
}

export const getPrincipio = (req: Request, res: Response) => {
    const { id } = req.params
    connection.query("SELECT id, nombre, estado FROM far_principioactivo WHERE id = ?", id, (err, data) => {
        if (err) throw err;
        res.json(data[0])
    })
}

export const postPrincipio = (req: Request, res: Response) => {
    const { body } = req
    connection.query("INSERT INTO far_principioactivo SET ?", [body], (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Principio activo agregado con éxito'
        })
    })
}

export const putPrincipio = (req: Request, res: Response) => {
    const { body } = req
    const { id } = req.params
    connection.query("UPDATE far_principioactivo SET ? WHERE id = ?", [body, id], (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Principio activo actualizado con éxito'
        })
    })
}

export const deletePrincipio = (req: Request, res: Response) => {
    const { id } = req.params
    connection.query("DELETE FROM far_principioactivo WHERE id = ?", id, (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Principio activo eliminado con éxito'
        })
    })
}