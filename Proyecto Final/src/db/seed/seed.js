import { MongoClient, ObjectId } from "mongodb";
import fs from 'fs';
import path from "path";

const uri = process.env.MONGODB_URI || "";

const client = new MongoClient(uri);

export const poblarDB = async () => {

  try {
    await client.connect();
    const adminDb = client.db().admin();
    const dbs = await adminDb.listDatabases();
    const existeTienda = dbs.databases.some(db => db.name === "Tienda");
    if (existeTienda) {
        console.log("La base de datos de la tienda ya existe");
        return
    }
    
    const dataPath = path.resolve("src/db/seed/seedData.json");
    const rawData = fs.readFileSync(dataPath, "utf-8");
    const { proveedores, productos, movimientos } = JSON.parse(rawData);

    const db = client.db("Tienda");
    const proveedoresMap = {};
    for (const prov of proveedores) {
      const _id = new ObjectId();
      proveedoresMap[prov.nombre] = _id;
      await db.collection("proveedores").insertOne({ ...prov, _id });
    }

    const productosMap = {};
    for (const prod of productos) {
      const _id = new ObjectId();
      productosMap[prod.codigo] = _id;
      await db.collection("productos").insertOne({
        ...prod,
        _id,
        proveedorId: proveedoresMap[prod.proveedorNombre],
        fechaUltimaActualizacion: new Date(prod.fechaUltimaActualizacion)
      });
    }

    for (const mov of movimientos) {
      await db.collection("movimientos").insertOne({
        ...mov,
        productoId: productosMap[mov.codigoProducto],
        fecha: new Date(mov.fecha)
      });
    }

    console.log("Datos insertados correctamente");
  } finally {
    await client.close();
  }
}