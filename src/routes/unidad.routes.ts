import { Router } from 'express'
import { deleteUnidad, getUnidad, getUnidades, postUnidad, putUnidad } from '../controllers/unidad.controller';

const router = Router();

router.get('/', getUnidades)
router.get('/:id', getUnidad)
router.delete('/:id', deleteUnidad)
router.post('/', postUnidad)
router.put('/:id', putUnidad)

export default router

