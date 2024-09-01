import { ObjectId } from "mongodb";
import User from "./user";

export enum TaskStatus {
    all = 0,
    done = 1,
    pendency = 2,
}

export default class Task {
    _id?: ObjectId;
    description: string;
    createdAt: string;
    updatedAt: string;
    status: TaskStatus;
    userId?: ObjectId;

    constructor(description: string, createdAt: string, updatedAt: string, status: TaskStatus, userId?: ObjectId, id?: ObjectId) {
        this._id = id;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.status = status;
        this.userId = userId;
    }
}