import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let singleton: Db;
 
export default async (): Promise<Db> => {
    if (singleton) return singleton;
    console.log('MONGO_HOST', `${process.env.MONGO_HOST}`)
    const client = new MongoClient(`${process.env.MONGO_HOST}`);
 
    await client.connect();
 
    singleton = client.db(process.env.MONGO_DATABASE);
 
    return singleton;
}