import {BadRequestException, Controller, Get, HttpCode, HttpStatus, Param, UsePipes} from "@nestjs/common";
import {ActionService} from "../service/action.service";
import {PermissionService} from "../service/permission.service";
import {ResourceService} from "../service/resource.service";
import {UuidValidationPipe} from "../pipes/uuid-validation.pipe";

@Controller('permissions')
export class PermissionController {

    constructor(
        private readonly actionService: ActionService,
        private readonly permissionService: PermissionService,
        private readonly resourceService: ResourceService
    ) {
    }

    @Get("actions")
    @HttpCode(HttpStatus.OK)
    async findAllActions() {
        return await this.actionService.findAll();
    }

    @Get("actions/:id")
    @HttpCode(HttpStatus.OK)
    @UsePipes(UuidValidationPipe)
    async findOneAction(@Param() payload: { id: string }) {
        const result = await this.actionService.findOne(payload.id);
        if (!result) {
            throw new BadRequestException("record doesn't exist");
        }
        return result;
    }

}