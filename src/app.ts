import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import router from './routes/Routes';
import mongoConnect from './database/Connection';

const server = express();

mongoConnect();

server.use(cors());
server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(router);

server.use((err: Error, req: Request, res: Response, next: Function) => res.status(400).json({ error: err.message }));
server.use((req: Request, res: Response) => res.status(404).send('404 - Not Found!'));

export default server;