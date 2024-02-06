import { Router } from 'express'
import { deleteArea, getArea, getAreas, postArea, putArea } from '../controllers/area.controller';

const router = Router();

router.get('/', getAreas)
router.get('/:id', getArea)
router.delete('/:id', deleteArea)
router.post('/', postArea)
router.put('/:id', putArea)

export default router

