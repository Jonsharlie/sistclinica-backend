import { Router } from 'express'
import { deleteProveedor, getProveedor, getProveedores, getProveedoresPorArea, postProveedor, putProveedor } from '../controllers/proveedor.controller';

const router = Router();

router.get('/sistema/:isSistema', getProveedores)
router.get('/area/:id_area', getProveedoresPorArea)
router.get('/:id', getProveedor)
router.post('/', postProveedor)
router.delete('/:id', deleteProveedor)
router.put('/:id', putProveedor)

export default router