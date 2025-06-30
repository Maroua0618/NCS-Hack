import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', async (req, res) => {
  const db = await connectDB();
  const collection = db.collection('test');
  const items = await collection.find({}).toArray();
  res.json(items);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
