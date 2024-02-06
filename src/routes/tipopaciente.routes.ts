import { Router } from 'express'
import { getTipoPacientes, getTipoPacientesActivos, getTipoPaciente } from '../controllers/tipopaciente.controller';

const router = Router();

router.get('/', getTipoPacientes)
router.get('/activos', getTipoPacientesActivos)
router.get('/:id', getTipoPaciente)

export default router

