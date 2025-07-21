import { ObjectId } from "mongodb";
import connectDB from "../db/mongoClient.js";

export async function registrarMovimiento(req, res) {
    
    try{
        let db = await connectDB();
        let {productoId, tipo, cantidad, motivo, usuario} = req.body;

        let productosColumna = db.collection('productos');
        let producto = await productosColumna.findOne({_id: new ObjectId(productoId)});
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
            {_id: new ObjectId(productoId)},
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
        console.error(error);
        res.status(500).json({error:'Error registrando el movimiento'});
    }
}

export async function reporteMovimientos(req, res) {
    try {
        const db = await connectDB();
        const { fechaInicio, fechaFin } = req.query;

        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);

        const movimientos = await db.collection('movimientos').find({
            fecha: {
                $gte: inicio,
                $lte: fin
            }
        }).toArray();

        res.status(200).json(movimientos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los movimientos' });    
    }
}


