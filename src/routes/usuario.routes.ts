import { Router } from 'express'
import { getUsuario, getUsuarios, validarAcceso } from '../controllers/usuario.controller';
import { postTrabajador } from '../controllers/trabajador.controller';

const router = Router();

router.get('/', getUsuarios)
router.get('/:id', getUsuario)
router.post('/', postTrabajador)
router.post('/validar-acceso/', validarAcceso)

export default router