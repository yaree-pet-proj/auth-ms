import dotenv from "dotenv";
import {AppModule} from "./module/app.module";
import {NestFactory} from "@nestjs/core";
import {ValidationPipe} from "@nestjs/common";

dotenv.config();
const PORT = process.env.APP_PORT || 3000;

NestFactory.create(AppModule).then(app => {
    app.useGlobalPipes(new ValidationPipe());
    app.listen(PORT).then(() => {
        console.log(`App listening port: ${PORT}`);
    }).catch(err => {
        console.log(`Unable to start app with err: ${err}`);
    });
});
