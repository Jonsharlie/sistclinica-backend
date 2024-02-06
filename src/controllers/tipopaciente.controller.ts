import { Request, Response } from 'express'
import connection from '../db/connection'

export const getTipoPacientes = (req: Request, res: Response) => {
    connection.query("SELECT * FROM gen_tipopaciente", (err, data) => {
        if( err) throw err;
        res.json(data)
    })
}

export const getTipoPacientesActivos = (req: Request, res: Response) => {
    connection.query("SELECT * FROM gen_tipopaciente where estado = true", (err, data) => {
        if( err) throw err;
        res.json(data)
    })
}

export const getTipoPaciente = (req: Request, res: Response) => {
    const {id} = req.params
    connection.query("SELECT * FROM gen_tipopaciente WHERE id = ?", id, (err, data) => {
        if (err) throw err;
        res.json(data[0])
    })
}