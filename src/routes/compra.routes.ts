import { Router } from 'express'
import { getCompra, getCompras, postCompra } from '../controllers/compra.controller'

const router = Router()

router.get('/', getCompras)
router.get('/:id_compra', getCompra)
router.post('/', postCompra)

export default router