import { Router } from "express";
import { registrarMovimiento, reporteMovimientos } from "../controllers/movimientosController.js";

const router = Router();

router.post('/', registrarMovimiento);
router.get('/reporte', reporteMovimientos);

export default router;