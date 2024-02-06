import { Router } from 'express'
import { getTipoDocumentoPersona, getTipoDocumentoEmpresa, getTipoDocumento, getTipoDocumentoCompra, getTipoDocumentoVenta } from '../controllers/tipodocumento.controller';

const router = Router();

router.get('/persona', getTipoDocumentoPersona)
router.get('/empresa', getTipoDocumentoEmpresa)
router.get('/compra', getTipoDocumentoCompra)
router.get('/venta', getTipoDocumentoVenta)
router.get('/:id', getTipoDocumento)

export default router

