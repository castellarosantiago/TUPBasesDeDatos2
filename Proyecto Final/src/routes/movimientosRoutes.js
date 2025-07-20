import { Router } from "express";
import { registrarMovimiento } from "../controllers/movimientosController";

const router = Router();

router.post('/', registrarMovimiento);


export default router;