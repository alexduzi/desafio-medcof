import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt'; 
import * as userRepository from "../repositories/userRepository";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userExists = await userRepository.getUserByEmail(req.body.email);

        if (!userExists)
            return res.status(400).json({ message: "User or password incorrect" });

        let hashedPassword = await bcrypt.compare(req.body.password, userExists.password);

        if (!hashedPassword)
            return res.status(400).json({ message: "User or password incorrect" });

        const accessToken = jwt.sign(
            {
                id: userExists._id,
                email: userExists.email
            },
            `${process.env.SECRET_JWT}`,
            { expiresIn: "1d" });

        return res
            .status(200)
            .json({ message: "User logged in", accessToken: accessToken });
    } catch (error) {
        console.log(error);
        next(error);
    }

};

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userExists = await userRepository.getUserByEmail(req.body.email, false);

        if (userExists)
            return res.status(400).json({ message: "User already exists" });

        const user = await userRepository.addUser(req.body);

        return res
            .status(200)
            .json({ message: "User created", user });
    } catch (error) {
        console.log(error);
        next(error);
    }

};