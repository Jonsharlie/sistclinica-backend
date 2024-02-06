import { Router } from 'express'
import { deleteConsulta, getConsulta, getConsultas, getHistorial, postConsulta, putConsulta, updateEstado } from '../controllers/consulta.controller';

const router = Router();

router.get('/', getConsultas)
router.get('/:id', getConsulta)
router.get('/historial/:nro_historia', getHistorial)
router.delete('/:id', deleteConsulta)
router.post('/', postConsulta)
router.put('/:id', putConsulta)
router.put('/actualizar-estado/:id', updateEstado)

export default router