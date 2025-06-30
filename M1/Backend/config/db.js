import { MongoClient } from "mongodb";

const uri = "mongodb+srv://StudyMate:X8V6jum187yriyp2@cluster0.kpyygwb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("StudyMateDB");           // your database
    const collectionName = "z";                // like table name

    const collections = await db.listCollections({ name: collectionName }).toArray();

    if (collections.length === 0) {
      await db.createCollection(collectionName);
      console.log(`✅ Collection '${collectionName}' created.`);
    } else {
      console.log(`ℹ️ Collection '${collectionName}' already exists.`);
    }
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await client.close();
  }
}

run();
