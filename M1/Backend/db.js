import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

export async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    return client.db(); // default database
  } catch (err) {
    console.error('MongoDB connection failed:', err);
  }
}
