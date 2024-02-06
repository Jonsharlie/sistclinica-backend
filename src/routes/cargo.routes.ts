import { Router } from 'express'
import { getCargos, getCargo, postCargo, putCargo, deleteCargo } from '../controllers/cargo.controller';

const router = Router();

router.get('/', getCargos);
router.get('/:id', getCargo);
router.post('/', postCargo);
router.delete('/:id', deleteCargo)
router.put('/:id', putCargo)

export default router