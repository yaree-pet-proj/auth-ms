import {Controller} from "@nestjs/common";
import {ActionService} from "../service/action.service";
import {PermissionService} from "../service/permission.service";
import {ResourceService} from "../service/resource.service";

@Controller('permissions')
export class PermissionController {

    constructor(
        private readonly actionService: ActionService,
        private readonly permissionService: PermissionService,
        private readonly resourceService: ResourceService
    ) {
    }

}