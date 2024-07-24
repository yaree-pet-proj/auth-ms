import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ResourceEntity} from "../entity/resource.entity";
import {Repository} from "typeorm";

@Injectable()
export class ResourceService {

    constructor(
        @InjectRepository(ResourceEntity)
        private resourceRepository: Repository<ResourceEntity>
    ) {
    }

    async findAll() {
        return await this.resourceRepository.find();
    }

    async findOne(id: string) {
        return await this.resourceRepository.findOne({
            where: {id}
        });
    }


}