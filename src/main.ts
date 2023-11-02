import { App } from "./app";
import { LoggerService } from "./logger/logger.sevice";

async function bootstrap() {
    const app = new App(new LoggerService())
    app.init()
}
bootstrap()