import { Router } from 'express'
import { deleteEspecialidad, getEspecialidad, getEspecialidades, postEspecialidad, putEspecialidad } from '../controllers/especialidad.controller';

const router = Router();

router.get('/', getEspecialidades)
router.get('/:id', getEspecialidad)
router.delete('/:id', deleteEspecialidad)
router.post('/', postEspecialidad)
router.put('/:id', putEspecialidad)

export default router

