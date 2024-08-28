import express from 'express';
import * as usersController from '../controllers/users';
import * as tasksController from '../controllers/tasks';
import * as authController from '../controllers/auth';
import passport from "passport";
import "../auth/passaport";

const router = express.Router();

// users
router.get('/users', passport.authenticate("jwt", { session: false }), usersController.getAllUsers);
router.get('/users/:id',passport.authenticate("jwt", { session: false }), usersController.getUserById);
router.post('/users', passport.authenticate("jwt", { session: false }), usersController.createUser);
router.put('/users', passport.authenticate("jwt", { session: false }), usersController.updateUser);
router.delete('/users', passport.authenticate("jwt", { session: false }), usersController.deleteUser);

// tasks
router.get('/tasks', passport.authenticate("jwt", { session: false }), tasksController.getAllTasks);
router.get('/tasks/:id', passport.authenticate("jwt", { session: false }), tasksController.getTaksById);
router.post('/tasks', passport.authenticate("jwt", { session: false }), tasksController.createTask);
router.put('/tasks', passport.authenticate("jwt", { session: false }), tasksController.updateTask);
router.delete('/tasks', passport.authenticate("jwt", { session: false }), tasksController.deleteTask);

// auth
router.post('/login', authController.login);

export default router;