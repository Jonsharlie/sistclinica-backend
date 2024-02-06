import { Router } from 'express'
import { getFormatoConsulta, postFormatoConsulta, putFormatoConsulta } from '../controllers/formatoConsulta.controller'

const router = Router()

router.get('/:id', getFormatoConsulta)
router.post('/', postFormatoConsulta)
router.put('/:id', putFormatoConsulta)

export default router