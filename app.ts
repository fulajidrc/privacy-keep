import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
const envUrl = process.env.NODE_ENV 
    ? path.resolve(__dirname, `../${process.env.NODE_ENV}.env`) 
    : path.resolve(__dirname, `../.env`);
console.log('envUrl', envUrl);
// require('dotenv').config({
//     path: envUrl
// });
dotenv.config({
  path: envUrl
});
import dbInit from './src/models';
dbInit();
import { sequelize } from './config/database';
import { restRouter } from './src/routes';





const app: Express = express();
const port = process.env.PORT;

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

app.use("/api/", restRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});