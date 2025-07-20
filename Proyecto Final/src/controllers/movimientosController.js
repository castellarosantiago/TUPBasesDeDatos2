import { ObjectId } from "mongodb";
import connectDB from "../db/mongoClient";

export async function registrarMovimiento(req, res) {
    try{
        let db = await connectDB();
        let {productoId, tipo, cantidad, motivo, usuario} = req.body;

        let productosColumna = db.collection('productos');
        let producto = await productosColumna.findOne({_id:new ObjectId});
        if(!producto) return res.status(404).json({error: 'Producto no encontrado'});

        let nuevoStock = producto.stockActual;
        if(tipo ==='entrada') {nuevoStock+=cantidad;}
        else if(tipo==='salida'){
            if(producto.stockActual < cantidad){
                return res.status(400).json({error:'Stock insuficiente'});
            }
            nuevoStock -= cantidad;
        }

        await productosColumna.updateOne(
            {_id: new ObjectId},
            {$set: {stockActual: nuevoStock, fechaUltimaActualizacion: new Date()}}
        );

        await db.collection('movimientos').insertOne({
            productoId: producto._id,
            tipo, cantidad, motivo, 
            fecha: new Date(),
            usuario
        });
        res.status(200).json({mensaje:'Movimiento registrado'});
    }catch(error){
        res.status(500).json({error:'Error registrando el movimiento'});
    }
}