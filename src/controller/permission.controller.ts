import {BadRequestException, Controller, Get, HttpCode, HttpStatus, Param, Query, UsePipes} from "@nestjs/common";
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
    async findOneAction(@Param('id', UuidValidationPipe) id: string) {
        const result = await this.actionService.findOne(id);
        if (!result) {
            throw new BadRequestException("record doesn't exist");
        }
        return result;
    }

    @Get('resources')
    @HttpCode(HttpStatus.OK)
    async findAllResources() {
        return await this.resourceService.findAll();
    }

    @Get("resources/:id")
    @HttpCode(HttpStatus.OK)
    async findOneResource(@Param('id', UuidValidationPipe) id: string) {
        const result = await this.resourceService.findOne(id);
        if (!result) {
            throw new BadRequestException("record doesn't exist");
        }
        return result;
    }


}