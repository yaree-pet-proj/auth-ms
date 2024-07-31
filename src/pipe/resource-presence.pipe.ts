import {
    BadRequestException,
    Injectable,
    PipeTransform
} from "@nestjs/common";
import {ResourceService} from "../service/resource.service";

@Injectable()
export class ResourcePresencePipe implements PipeTransform {

    constructor(
        private readonly resourceService: ResourceService
    ) {
        this.resourceService = resourceService;
    }

    async transform(value: string) {
        const resource = await this.resourceService.findOne(value);
        if (!resource) {
            throw new BadRequestException("Record doesn't exist");
        }
        return value;
    }

}