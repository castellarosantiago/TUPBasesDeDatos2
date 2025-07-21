import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.MONGODB_URI || "";
const client = new MongoClient(connectionString);

export default async function connectDB() {
  if (!client.topology?.isConnected()) {
    await client.connect();
    console.log('MongoDB conectado');
  }
  return client.db("Tienda");
}