// import model
import { Request, Response } from "express";

import * as userRepository from "../repositories/userRepository";
import User from "../models/user";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.getUsers();
    return res.status(200).send({ data: users });
  } catch (err: any) {
    return res.status(500).send({ message: err });
  }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const user = await userRepository.getUser(id);
        return res.status(200).send({ data: user });
    } catch (err: any) {
        return res.status(500).send({ message: err });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = req.body as User;
        const newUser = await userRepository.addUser(user);
        return res.status(200).send({ data: newUser });
    } catch (err: any) {
        return res.status(500).send({ message: err });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const user = req.body as User;
        const updatedUser = await userRepository.updateUser(id, user);
        return res.status(200).send({ data: updatedUser });
    } catch (err: any) {
        return res.status(500).send({ message: err });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const deleted = await userRepository.deleteCustomer(id);
        return res.status(200).send({ data: deleted });
    } catch (err: any) {
        return res.status(500).send({ message: err });
    }
};