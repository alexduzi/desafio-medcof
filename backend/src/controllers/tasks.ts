import { Request, Response } from "express";

import * as taskRepository from "../repositories/taskRepository";
import Task, { TaskStatus } from "../models/task";
import User from "../models/user";
import { ObjectId } from "mongodb";

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    if (!req.user) throw new Error("User dos not exists!")

    const user = req.user as User;

    let status = 0;

    if (req.query.status)
        status = Number.parseInt(req.query.status as string) as TaskStatus;

    const userId = user?._id?.toHexString()!;

    const tasks = await taskRepository.getTasks(status, userId);
    return res.status(200).send({ data: tasks });
  } catch (err: any) {
    return res.status(500).send({ message: err });
  }
};

export const getTaksById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const task = await taskRepository.getTask(id);
        return res.status(200).send({ data: task });
    } catch (err: any) {
        return res.status(500).send({ message: err });
    }
};

export const createTask = async (req: Request, res: Response) => {
    try {
        const task = req.body as Task;
        const user = req.user as User;
        task.userId = user?._id;
        task._id = undefined;

        await taskRepository.addTask(task);

        const tasks = await taskRepository.getTasks(0,  user?._id?.toHexString()!);

        return res.status(200).send({ data: tasks });
    } catch (err: any) {
        return res.status(500).send({ message: err });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const task = req.body as Task;
        const user = req.user as User;

        const updatedTask = await taskRepository.updateTask(task._id?.toString() ?? '', task);
        
        const tasks = await taskRepository.getTasks(0,  user?._id?.toHexString()!);

        return res.status(200).send({ data: tasks });
    } catch (err: any) {
        return res.status(500).send({ message: err });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const user = req.user as User;
        const deleted = await taskRepository.deleteTask(id);

        const tasks = await taskRepository.getTasks(0,  user?._id?.toHexString()!);

        return res.status(200).send({ data: tasks });
    } catch (err: any) {
        return res.status(500).send({ message: err });
    }
};