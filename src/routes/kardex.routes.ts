import { Router } from 'express'
import { getMovimientosPorProducto } from '../controllers/kardex.controller'

const router = Router()

router.get('/movimientos/:id_producto', getMovimientosPorProducto)

export default router