import { Request, Response } from 'express'
import connection from '../db/connection'

export const getTipoDocumentoPersona = (req: Request, res: Response) => {
    let sql = "SELECT id, codigo_sunat, nombre, abreviatura ";
    sql += "FROM gen_tipodocumento WHERE persona = 1 and estado = 1";
    connection.query(sql, (err, data) => {
        if( err) throw err;
        res.json(data)
    })
}

export const getTipoDocumentoEmpresa = (req: Request, res: Response) => {
    let sql = "SELECT id, codigo_sunat, nombre, abreviatura ";
    sql += "FROM gen_tipodocumento WHERE persona = 0 and estado = 1 and venta = 1";
    connection.query(sql, (err, data) => {
        if( err) throw err;
        res.json(data)
    })
}

export const getTipoDocumento = (req: Request, res: Response) => {
    const {id} = req.params
    let sql = "SELECT id, codigo_sunat, nombre, abreviatura, longitud, numerico, nacional, persona, exacto, estado ";
    sql += "FROM gen_tipodocumento WHERE id = ?";
    connection.query(sql, id, (err, data) => {
        if (err) throw err;
        res.json(data[0])
    })
}

export const getTipoDocumentoCompra = (req: Request, res: Response) => {
    let sql = "SELECT id, codigo_sunat, nombre, abreviatura ";
    sql += "FROM gen_tipodocumento WHERE compra = 1 and venta = 1 and estado = 1";
    console.log('sql documentos compra', sql)
    connection.query(sql, (err, data) => {
        if( err) throw err;
        res.json(data)
    })
}

export const getTipoDocumentoVenta = (req: Request, res: Response) => {
    let sql = "SELECT id, codigo_sunat, nombre, abreviatura ";
    sql += "FROM gen_tipodocumento WHERE venta = 1 and compra = 0 and estado = 1";
    connection.query(sql, (err, data) => {
        if( err) throw err;
        res.json(data)
    })
}