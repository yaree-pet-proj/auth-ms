import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AppDataSource} from '../../datasource'
import {PermissionModule} from "./permission.module";

@Module({
    imports: [
        TypeOrmModule.forRoot(AppDataSource.options),
        PermissionModule
    ]
})
export class AppModule {

}