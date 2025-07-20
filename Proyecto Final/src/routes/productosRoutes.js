import { Router } from 'express';
import { agregarProducto, listarProductos, consultarStock, productosStockBajo } from '../controllers/productosController.js';

const router = Router();

router.post('/', agregarProducto);
router.get('/', listarProductos); 
router.get('/stock/:codigo', consultarStock);
router.get('/stock/bajo', productosStockBajo);


export default router;