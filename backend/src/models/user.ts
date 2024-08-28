import { ObjectId } from "mongodb";
import Task from "./task";

export default class User {
    _id?: ObjectId;
    name: string;
    email: string;
    password: string;
    tasks: Task[];

    constructor(name: string, email: string, password: string, tasks: Task[], id?: ObjectId) {
        this._id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.tasks = tasks;
    }
}