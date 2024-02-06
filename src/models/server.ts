import express, { Application } from "express"
import routesEspecialidades from '../routes/especialidad.routes'
import routerUnidades from '../routes/unidad.routes'
import routerTipoDocumento from '../routes/tipodocumento.routes'
import routerTipoPaciente from '../routes/tipopaciente.routes'
import routerPaciente from '../routes/paciente.routes'
import routerPrincipioActivo from '../routes/principioactivo.routes'
import routerArea from '../routes/area.routes'
import routerCargo from '../routes/cargo.routes'
import routerTrabajador from '../routes/trabajador.routes'
import routerConsulta from '../routes/consulta.routes'
import routerConsultaDetalle from '../routes/consultadetalle.routes'
import routerFormatoConsulta from '../routes/formatoconsulta.routes'
import routerProducto from '../routes/producto.routes'
import routerProveedor from '../routes/proveedor.routes'
import routerCompra from '../routes/compra.routes'
import routerVenta from '../routes/venta.routes'
import routerDocumentoNumeracion from '../routes/documentonumeracion.routes'
import routerKardex from '../routes/kardex.routes'
import routerUsuario from '../routes/usuario.routes'
import routerPrecio from '../routes/precio.routes'

import connection from "../db/connection"
import cors from 'cors';

class Server {
    private app: Application
    private port: string

    constructor() {
        this.app = express()
        this.port = process.env.PORT || '4000'
        this.middlewares()
        this.routes()
        this.conectarDB()
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicación corriendo por el puerto ', this.port)
        })
    }

    middlewares() {
        this.app.use(express.json())
        this.app.use(cors())
    }

    routes() {
        this.app.use('/api/especialidades', routesEspecialidades)
        this.app.use('/api/unidades', routerUnidades)
        this.app.use('/api/tipodocumentos', routerTipoDocumento)
        this.app.use('/api/tipopacientes', routerTipoPaciente)
        this.app.use('/api/pacientes', routerPaciente)
        this.app.use('/api/principios', routerPrincipioActivo)
        this.app.use('/api/areas', routerArea)
        this.app.use('/api/cargos', routerCargo)
        this.app.use('/api/trabajadores', routerTrabajador)
        this.app.use('/api/consultas', routerConsulta)
        this.app.use('/api/consultadetalle', routerConsultaDetalle)
        this.app.use('/api/formatoconsulta', routerFormatoConsulta)
        this.app.use('/api/productos', routerProducto)
        this.app.use('/api/proveedores', routerProveedor)
        this.app.use('/api/compras', routerCompra)
        this.app.use('/api/ventas', routerVenta)
        this.app.use('/api/documentonumeracion', routerDocumentoNumeracion)
        this.app.use('/api/kardex', routerKardex)
        this.app.use('/api/usuarios', routerUsuario)
        this.app.use('/api/precios', routerPrecio)
    }

    conectarDB() {
        connection.connect((err) => {
            if(err) throw err;
            console.log('Conectado a la BD')
        })
    }
}

export default Server;