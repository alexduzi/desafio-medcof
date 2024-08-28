import { Request, Response } from "express";

import * as taskRepository from "../repositories/taskRepository";
import Task, { TaskStatus } from "../models/task";
import User from "../models/user";

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    if (!req.user) throw new Error("User dos not exists!")

    const user = req.user as User;

    let status = 0;

    if (req.params.status)
        status = Number.parseInt(req.params.status) as TaskStatus;

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
        const newTask = await taskRepository.addTask(task);
        return res.status(200).send({ data: newTask });
    } catch (err: any) {
        return res.status(500).send({ message: err });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const task = req.body as Task;
        const updatedTask = await taskRepository.updateTask(id, task);
        return res.status(200).send({ data: updatedTask });
    } catch (err: any) {
        return res.status(500).send({ message: err });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const deleted = await taskRepository.deleteTask(id);
        return res.status(200).send({ data: deleted });
    } catch (err: any) {
        return res.status(500).send({ message: err });
    }
};