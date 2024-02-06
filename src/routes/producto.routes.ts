import { Router } from 'express'
import { getProducto, getProductos, getProductosPorArea, getProductosPorAreaActivos, getProductosPorBusqueda, postProducto, putProducto } from '../controllers/producto.controller'

const router = Router()

router.get('/', getProductos)
router.get('/area/:id_area', getProductosPorArea)
router.get('/area/:id_area/activos', getProductosPorAreaActivos)
router.get('/buscar/:filter', getProductosPorBusqueda)
router.get('/:id', getProducto)
router.post('/', postProducto)
router.put('/:id', putProducto)

export default router