import connectDB from '../db/mongoClient.js';

export async function agregarProducto(req, res) {
  try {
    const db = await connectDB();
    const producto = req.body;
    await db.collection('productos').insertOne(producto);
    res.status(201).json({ mensaje: 'Producto agregado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar producto' });
  }
}

export async function listarProductos(req, res) {
    try {
      const db = await connectDB();
      const productos = await db.collection('productos').find().toArray();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  }