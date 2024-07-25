import {Module} from "@nestjs/common";
import {PermissionController} from "../controller/permission.controller";
import {PermissionService} from "../service/permission.service";
import {ActionService} from "../service/action.service";
import {ResourceService} from "../service/resource.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {ActionsModel} from "../model/actions.model";
import {PermissionModel} from "../model/permission.model";
import {ResourceModel} from "../model/resource.model";

@Module({
    imports: [
        SequelizeModule.forFeature([
            ActionsModel,
            PermissionModel,
            ResourceModel
        ])
    ],
    controllers: [PermissionController],
    providers: [PermissionService, ActionService, ResourceService],
    exports: [PermissionService, ActionService, ResourceService],
})
export class PermissionModule {

}