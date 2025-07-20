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

  //
export async function consultarStock(req, res) {
  try{
    const db = await connectDB();
    const {codigo}= req.params;
    const producto = await db.collection('productos').findOne({codigo});
    if(!producto){
      return res.status(404).json({error:'Producto no encontrado'});
    }
    res.json({codigo: producto.codigo, stockActual:producto.stockActual});
  }catch(error){
    res.status(500).json({error:'Error al consultar el stock'})
  }
}

//
export async function productosStockBajo(req, res) {
  try{
    const db = await connectDB();
    const productos = await db.collection('productos').find({
      $expr:{$lt:["$stockActual", "$stockMinimo"]}
    }).toArray();
    res.json(productos);
  }catch(error){
    res.status(500).json({error: 'Error al consultar productos con stock bajo'})
  }
}