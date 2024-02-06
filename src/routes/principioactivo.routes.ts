import { Router } from 'express'
import { deletePrincipio, getPrincipio, getPrincipios, postPrincipio, putPrincipio } from '../controllers/principioactivo.controller';

const router = Router();

router.get('/', getPrincipios);
router.get('/:id', getPrincipio);
router.post('/', postPrincipio);
router.delete('/:id', deletePrincipio)
router.put('/:id', putPrincipio)

export default router