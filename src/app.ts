import express, { Express } from "express"
import {Server} from 'http';
import { inject, injectable } from "inversify";
import { ExeptionFilter } from "./errors/exeption.filter";
import { LoggerService } from "./logger/logger.sevice";
import { TYPES } from "./types";
import { UserController } from './users/users.controller';
import { ILogger } from './logger/logger.interface';

@injectable()
export class App {
    app: Express
    port: number
    server: Server
    constructor(
        @inject(TYPES.ILogger) private logger: ILogger,
        @inject(TYPES.UserController) private userController: UserController,
        @inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter
    ) {
        this.app = express();
        this.port = 3001;
    }
    useRoutes() {
        this.app.use('/users', this.userController.router)
    }
    useExeptionFilters() {
        this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter))

    }
    public async init() {
        this.useRoutes()
        this.useExeptionFilters()
        this.server = this.app.listen(this.port)
        this.logger.log(`http://localhost:${this.port}`)
    }
}