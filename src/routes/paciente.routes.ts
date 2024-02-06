import { Router } from 'express'
import { getPacientes, getPaciente, postPaciente, putPaciente, deletePaciente } from '../controllers/paciente.controller'

const router = Router();

router.get('/', getPacientes)
router.get('/:nro_historia', getPaciente)
router.delete('/:nro_historia', deletePaciente)
router.post('/', postPaciente)
router.put('/:nro_historia', putPaciente)

export default router