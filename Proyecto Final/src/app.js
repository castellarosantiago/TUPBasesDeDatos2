import express from 'express';
import dotenv from 'dotenv';
import productosRoutes from './routes/productosRoutes.js';
import { poblarDB } from './db/seed/seed.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/productos', productosRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await poblarDB();
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error al poblar la base de datos o iniciar el servidor:", error);
  }
}

startServer();