import { Router } from "express";
import { getUltimoPrecio } from "../controllers/precio.controller";

const router = Router();

router.get('/ultimo-precio/:id_producto', getUltimoPrecio)

export default router