import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ActionsEntity} from "../entity/actions.entity";
import {PermissionsEntity} from "../entity/permissions.entity";
import {ResourceEntity} from "../entity/resource.entity";
import {PermissionController} from "../controller/permission.controller";
import {PermissionService} from "../service/permission.service";
import {ActionService} from "../service/action.service";
import {ResourceService} from "../service/resource.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ActionsEntity,
            PermissionsEntity,
            ResourceEntity
        ])
    ],
    controllers: [PermissionController],
    providers: [PermissionService, ActionService, ResourceService],
    exports: [PermissionService, ActionService, ResourceService],
})
export class PermissionModule {

}