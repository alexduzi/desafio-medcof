import User from '../models/user';
import connect from './db';
import { ObjectId } from 'mongodb';
import * as tasksRepository from './taskRepository';
import bcrypt from 'bcrypt';

const COLLECTION = "users";
 
export async function getUser(id: string): Promise<User | null> {
    if (!ObjectId.isValid(id)) throw new Error(`Invalid id.`);
 
    const db = await connect();
    const user = await db.collection<User>(COLLECTION)
        .findOne({ _id: ObjectId.createFromHexString(id) });
 
    if (!user) return null;

    const tasks = await tasksRepository.getTasks(undefined, user._id?.toHexString()!);

    user.tasks.push(...tasks);
 
    return user;
}

export async function getUserByName(name: string): Promise<User | null> {
    const db = await connect();
    const user = await db.collection<User>(COLLECTION)
        .findOne({ name: name });
 
    if (!user) return null;

    const tasks = await tasksRepository.getTasks(undefined, user._id?.toHexString()!);

    user.tasks.push(...tasks);
 
    return user;
}

export async function getUserByEmail(email: string, withTasks: boolean = true): Promise<User | null> {
    const db = await connect();
    const user = await db.collection<User>(COLLECTION)
        .findOne({ email: email });

    if (!user) return null;

    if (!withTasks) return user;

    const tasks = await tasksRepository.getTasks(undefined, user._id?.toHexString()!);

    user.tasks.push(...tasks);
 
    return user;
}
 
export async function getUsers(): Promise<User[]> {
    const db = await connect();
    const users = await db.collection<User>(COLLECTION)
        .find()
        .toArray();
 
    return users;
}

export async function addUser(user: User): Promise<User> {
    if (!user.name || !user.email || !user.password)
        throw new Error(`Invalid user.`);

    let saltRounds = 10;
    let hashedPassword = await bcrypt.hash(user.password, saltRounds);
    
    user.password = hashedPassword;
    console.log(user)

    const db = await connect();
    const result = await db.collection<User>(COLLECTION)
        .insertOne(user);
 
    user._id = result.insertedId;

    return user;
}
 
export async function updateUser(id: string, newUser: User): Promise<User | null> {
    if (!ObjectId.isValid(id)) throw new Error(`Invalid id.`);
 
    const db = await connect();
    await db.collection<User>(COLLECTION)
        .updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: newUser });
 
    return getUser(id);
}
 
export async function deleteCustomer(id: string): Promise<boolean> {
    if (!ObjectId.isValid(id)) throw new Error(`Invalid id.`);
    
    const db = await connect();
    const result = await db.collection<User>(COLLECTION)
        .deleteOne({ _id: ObjectId.createFromHexString(id) });
 
    return result.deletedCount > 0;
}

export async function insertMany(users: User[]): Promise<any> {
    const db = await connect();
    const result = await db.collection<User>(COLLECTION)
        .insertMany(users);
 
    return result;
}

export async function deleteMany({}): Promise<any> {
    const db = await connect();
    const result = await db.collection<User>(COLLECTION).deleteMany();
 
    return result;
}