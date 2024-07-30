import {
    BadRequestException,
    Injectable,
    PipeTransform
} from "@nestjs/common";
import {ResourceService} from "../service/resource.service";
import {CreateResourceDto} from "../model/resource.model";

@Injectable()
export class ResourceAbsencePipe implements PipeTransform {

    constructor(
        private readonly resourceService: ResourceService
    ) {
        this.resourceService = resourceService;
    }

    async transform(payload: CreateResourceDto) {
        const resources = await this.resourceService.findAll();
        const resource = resources.find(resource => resource.name === payload.name);
        if (resource) {
            throw new BadRequestException("Resource name is taken");
        }
        return payload;
    }

}