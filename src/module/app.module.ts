import {Module} from "@nestjs/common";
import {PermissionModule} from "./permission.module";
import {SequelizeModule} from "@nestjs/sequelize";
import databaseConfig from "../database/sequelize.config.js";
import {ActionsModel} from "../model/actions.model";
import {config} from 'dotenv';
import {PermissionModel} from "../model/permission.model";
import {ResourceModel} from "../model/resource.model";

config();
const NODE_ENV = process.env.NODE_ENV || 'dev';

@Module({
    imports: [
        SequelizeModule.forRoot({
            ...databaseConfig[NODE_ENV],
            models: [
                ActionsModel,
                PermissionModel,
                ResourceModel
            ]
        }),
        PermissionModule
    ]
})
export class AppModule {

}
