import express from 'express';
import dotenv from 'dotenv';
import productosRoutes from './routes/productosRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/productos', productosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});