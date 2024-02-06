import { Router } from 'express'
import { getNumeracion } from '../controllers/documentonumeracion.controller'

const router = Router()

router.get('/:id_tipo_documento', getNumeracion)

export default router