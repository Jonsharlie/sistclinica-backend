import { Router } from 'express'
import { postConsultaDetalle } from '../controllers/consultadetalle.controller';

const router = Router();

router.post('/', postConsultaDetalle)

export default router