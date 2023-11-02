import express, { Express } from "express"
import {Server} from 'http';
import { LoggerService } from "./logger/logger.sevice";
import { userRouter } from "./users/users";

export class App {
    app: Express
    port: number
    server: Server
    logger: LoggerService
    constructor(logger: LoggerService) {
        this.app = express();
        this.port = 3001;
        this.logger = logger;
    }
    useRoutes() {
        this.app.use('/users', userRouter)
    }
    public async init() {
        this.useRoutes()
        this.server = this.app.listen(this.port)
        this.logger.log(`http://localhost:${this.port}`)
    }
}