import express, { Request, Response } from "express";
import dotenv from "dotenv";
import helmet from 'helmet'
import healthcheck from 'express-healthcheck';
import passaport from 'passport';
import cors from 'cors';
import "express-async-errors";

import routes from './routes/api';
import { errorHandler } from "./middleware/error";

// configures dotenv to work in your application
dotenv.config();
const app = express();

app.use(helmet());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
// app.use(passaport());

app.use('/healthcheck', healthcheck({
  healthy: function () {
    return { everything: 'is ok' };
  },
  test: function () {
    throw new Error('Application is not running');
  }
}));

app.use(errorHandler);

app.use('/api', routes);

const PORT = process.env.PORT;

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});