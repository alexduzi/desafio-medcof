import Task from '../models/task';
import User from '../models/user';
import connect from './db';
import { ObjectId } from 'mongodb';
 
const COLLECTION = "tasks";
 
export async function getTask(id: string): Promise<Task | null> {
    if (!ObjectId.isValid(id)) throw new Error(`Invalid id.`);
 
    const db = await connect();
    const task = await db.collection<Task>(COLLECTION)
        .findOne({ _id: ObjectId.createFromHexString(id) });
 
    if (!task) return null;
 
    return task;
}
 
export async function getTasks(status: number | undefined, userId: string): Promise<Task[]> {
    const db = await connect();

    if (status === 0)
        return await db.collection<Task>(COLLECTION)
        .find({ userId: ObjectId.createFromHexString(userId) })
        .toArray();
        
    return await db.collection<Task>(COLLECTION)
        .find({ userId: ObjectId.createFromHexString(userId), status })
        .toArray();
}

export async function addTask(task: Task): Promise<Task> {
    if (!task.description || !task.userId)
        throw new Error(`Invalid task.`);
 
    const db = await connect();
    const result = await db.collection<Task>(COLLECTION)
        .insertOne(task);
 
    task._id = result.insertedId;
    
    return task;
}
 
export async function updateTask(id: string, newTask: Task): Promise<Task | null> {
    if (!ObjectId.isValid(id)) throw new Error(`Invalid id.`);

    const updatedAt = new Date().toISOString();
    const db = await connect();
    const result = await db.collection<Task>(COLLECTION)
        .updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: { description: newTask.description, status: newTask.status, updatedAt } });

    return await getTask(id);
}
 
export async function deleteTask(id: string): Promise<boolean> {
    if (!ObjectId.isValid(id)) throw new Error(`Invalid id.`);
    
    const db = await connect();
    const result = await db.collection<Task>(COLLECTION)
        .deleteOne({ _id: ObjectId.createFromHexString(id) });
 
    return result.deletedCount > 0;
}

export async function insertMany(tasks: Task[]): Promise<any> {
    const db = await connect();
    const result = await db.collection<Task>(COLLECTION)
        .insertMany(tasks);
 
    return result;
}

export async function deleteMany({}): Promise<any> {
    const db = await connect();
    const result = await db.collection<Task>(COLLECTION).deleteMany();
 
    return result;
}