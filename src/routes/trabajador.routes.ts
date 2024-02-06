import { Router } from 'express'
import { deleteTrabajador, getTrabajador, getTrabajadores, getTrabajadoresPorCargo, postTrabajador, putTrabajador } from '../controllers/trabajador.controller';

const router = Router();

router.get('/', getTrabajadores)
router.get('/cargo/:idCargo', getTrabajadoresPorCargo)
router.get('/:id', getTrabajador)
router.delete('/:id', deleteTrabajador)
router.post('/', postTrabajador)
router.put('/:id', putTrabajador)

export default router