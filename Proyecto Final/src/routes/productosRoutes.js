import { Router } from 'express';
import { agregarProducto, listarProductos } from '../controllers/productosController.js';

const router = Router();

router.post('/', agregarProducto);
router.get('/', listarProductos); 

export default router;