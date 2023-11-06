import 'reflect-metadata'
import { Container, ContainerModule, interfaces } from "inversify";
import { App } from "./app";
import { ExeptionFilter } from "./errors/exeption.filter";
import { LoggerService } from "./logger/logger.sevice";
import { UserController } from "./users/users.controller";
import { TYPES } from './types';
import { ILogger } from "./logger/logger.interface";
import { IExeptionFilter } from './errors/exeption.filter.interface';


export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
    bind<ILogger>(TYPES.ILogger).to(LoggerService)
    bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter)
    bind<UserController>(TYPES.UserController).to(UserController)
    bind<App>(TYPES.Aplication).to(App)
})

function bootstrap( ) {
    const appContainer = new Container();
    appContainer.load(appBindings)
    const app = appContainer.get<App>(TYPES.Aplication)
    app.init()
    return {app, appContainer}
}




export const {app, appContainer} = bootstrap();