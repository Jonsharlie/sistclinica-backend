import { Router } from 'express'
import { getVentas, postVenta } from '../controllers/venta.controller'

const router = Router()

router.get('/', getVentas)
router.post('/', postVenta)

export default router