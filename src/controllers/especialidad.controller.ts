import { Request, Response } from 'express'
import connection from '../db/connection'

export const getEspecialidades = (req: Request, res: Response) => {
    connection.query("SELECT * FROM adm_especialidad", (err, data) => {
        if( err) throw err;
        res.json(data)
    })
}

export const getEspecialidad = (req: Request, res: Response) => {
    const {id} = req.params
    connection.query("SELECT * FROM adm_especialidad WHERE id = ?", id, (err, data) => {
        if (err) throw err;
        res.json(data[0])
    })
}

export const deleteEspecialidad = (req: Request, res: Response) => {
    const {id} = req.params
    connection.query("DELETE FROM adm_especialidad WHERE id = ?", id, (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Especialidad eliminada con éxito'
        })
    })
}

export const postEspecialidad = (req: Request, res: Response) => {
    const { body } = req
    connection.query("INSERT INTO adm_especialidad SET ?", [body], (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Especialidad agregada con éxito'
        })
    })
}

export const putEspecialidad = (req: Request, res: Response) => {
    const { body } = req
    const { id } = req.params

    connection.query("UPDATE adm_especialidad SET ? WHERE id = ?", [body, id], (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Especialidad actualizada con éxito'
        })
    })
}