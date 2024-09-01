import User from "../models/user";
import * as userRepository from "./userRepository";
import * as taskRepository from "./taskRepository";

import bcrypt from 'bcrypt'; 
import Task, { TaskStatus } from "../models/task";

(
    async () => {
        const usersDeleted = await userRepository.deleteMany({});
        const tasksDeleted = await taskRepository.deleteMany({});

        let adminUser = new User("ADMIN", "admin@gmail.com.br", "123456", []);
        let user1 = new User("Teste 1", "teste1@gmail.com.br", "123456", []);
        let user2 = new User("Teste 2", "teste2@gmail.com.br", "123456", []);

        let saltRounds = 10;
        let hashedPassword = await bcrypt.hash(adminUser.password, saltRounds);

        adminUser.password = hashedPassword;
        user1.password = hashedPassword;
        user2.password = hashedPassword;

        const users = [adminUser, user1, user2];

        const resultInsertManyUsers = await userRepository.insertMany(users);

        console.log("insertMany users ", resultInsertManyUsers);

        const userTest1 = await userRepository.getUserByName("Teste 1");

        const creatAt = new Date().toDateString();

        let task1 = new Task("descrição task 1", creatAt, creatAt, TaskStatus.pendency, userTest1?._id);
        let task2 = new Task("descrição task 2", creatAt, creatAt, TaskStatus.pendency, userTest1?._id);
        let task3 = new Task("descrição task 3", creatAt, creatAt, TaskStatus.done, userTest1?._id);
        
        const userTest2 = await userRepository.getUserByName("Teste 2");

        let task4 = new Task("descrição task 1", creatAt, creatAt, TaskStatus.done, userTest2?._id);
        let task5 = new Task("descrição task 2", creatAt, creatAt, TaskStatus.pendency, userTest2?._id);
        let task6 = new Task("descrição task 3", creatAt, creatAt, TaskStatus.done, userTest2?._id);

        const adminUser2 = await userRepository.getUserByName("ADMIN");

        let task7 = new Task("descrição task 1", creatAt, creatAt, TaskStatus.done, adminUser2?._id);
        let task8 = new Task("descrição task 2", creatAt, creatAt, TaskStatus.pendency, adminUser2?._id);
        let task9 = new Task("descrição task 3", creatAt, creatAt, TaskStatus.done, adminUser2?._id);

        const tasks = [
            task1,
            task2,
            task3,
            task4,
            task5,
            task6,
            task7,
            task8,
            task9
        ];

        const resultTasks = await taskRepository.insertMany(tasks);

        console.log("insertMany users ", resultTasks);
    }
)();