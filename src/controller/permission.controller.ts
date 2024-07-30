import {
    BadRequestException,
    Body,
    Controller, Delete, ForbiddenException,
    Get,
    HttpCode,
    HttpStatus,
    Param, Patch,
    Post
} from "@nestjs/common";
import {ActionService} from "../service/action.service";
import {PermissionService} from "../service/permission.service";
import {ResourceService} from "../service/resource.service";
import {UuidValidationPipe} from "../pipe/uuid-validation.pipe";
import {
    CreateResourceDto,
    ResourceDto
} from "../model/resource.model";
import {ResourcePresencePipe} from "../pipe/resource-presence.pipe";
import {ResourceAbsencePipe} from "../pipe/resource-absent.pipe";

@Controller('permissions')
export class PermissionController {

    constructor(
        private readonly actionService: ActionService,
        private readonly permissionService: PermissionService,
        private readonly resourceService: ResourceService
    ) {
        this.actionService = actionService;
        this.permissionService = permissionService;
        this.resourceService = resourceService;
    }

    @Get("actions")
    @HttpCode(HttpStatus.OK)
    async findAllActions() {
        return this.actionService.findAll();
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
    async findAllResources(): Promise<ResourceDto[]> {
        const resources = await this.resourceService.findAll();
        const actions = await this.actionService.findAll();
        const response = [];
        for (const resource of resources) {
            const permissions = await this.permissionService.findAll(resource.id);
            response.push({
                id: resource.id,
                name: resource.name,
                permissions: permissions.map(permission => {
                    return {
                        id: permission.id,
                        name: actions.find(action => action.id === permission.action_id).name
                    };
                })
            });
        }
        return response;
    }

    @Post("resources")
    @HttpCode(HttpStatus.CREATED)
    async createOneResource(
        @Body() payload: CreateResourceDto
    ): Promise<ResourceDto> {
        const resources = await this.resourceService.findAll();
        if (resources.find(resource => resource.name === payload.name)) {
            throw new BadRequestException("Resource already exist");
        }
        const resource = await this.resourceService.createOne(payload.name);
        const actions = await this.actionService.findAll();
        actions.forEach(action => {
            // this is added as experimental one
            // might be a weak point as db inserts are neither handled nor awaited
            this.permissionService.createOne({
                action_id: action.id,
                resource_id: resource.id
            });
        });
        return this.findOneResource(resource.id);
    }

    @Get("resources/:id")
    @HttpCode(HttpStatus.OK)
    async findOneResource(@Param('id', UuidValidationPipe, ResourcePresencePipe) id: string): Promise<ResourceDto> {
        const resource = await this.resourceService.findOne(id);
        const actions = await this.actionService.findAll();
        const permissions = await this.permissionService.findAll(resource.id);
        return {
            id: resource.id,
            name: resource.name,
            permissions: permissions.map(permission => {
                return {
                    id: permission.id,
                    name: actions.find(action => action.id === permission.action_id).name
                };
            })
        };
    }

    @Delete("resources/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteOneResource(@Param('id', UuidValidationPipe, ResourcePresencePipe) id: string) {
        const affectedRows = await this.resourceService.deleteOne(id);
        if (affectedRows === 0) {
            throw new ForbiddenException();
        }
    }

    @Patch("/resources/:id")
    @HttpCode(HttpStatus.OK)
    async updateOneResource(@Param('id', UuidValidationPipe, ResourcePresencePipe) id: string,
                            @Body(ResourceAbsencePipe) payload: CreateResourceDto) {
        const [affectedCount, affectedRows] = await this.resourceService.updateOne(id, payload.name);
        if (affectedCount[0] === 0) {
            throw new ForbiddenException();
        }
        return affectedRows;
    }

}