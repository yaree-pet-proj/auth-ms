import dotenv from "dotenv"
import {AppModule} from "./module/app.module";
import {NestFactory} from "@nestjs/core";
import {ValidationPipe} from "@nestjs/common";
import { AppDataSource } from '../datasource';

dotenv.config();
let PORT = process.env.APP_PORT || 3000;

NestFactory.create(AppModule).then(app => {
    app.useGlobalPipes(new ValidationPipe());
    AppDataSource.initialize().then(() => {
        app.listen(PORT).then(() => {
            console.log(`App listening port: ${PORT}`);
        }).catch(err => {
            console.log(`Unable to start app with err: ${err}`);
        });
    });
});