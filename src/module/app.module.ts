import {Module} from "@nestjs/common";
import {PermissionModule} from "./permission.module";
import {SequelizeModule} from "@nestjs/sequelize";
import getSequelizeConfig from "../database/sequelize.config";

@Module({
    imports: [
        SequelizeModule.forRoot(getSequelizeConfig()),
        PermissionModule
    ]
})
export class AppModule {

}