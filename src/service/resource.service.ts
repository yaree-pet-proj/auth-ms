import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {ResourceModel} from "../model/resource.model";

@Injectable()
export class ResourceService {

    constructor(
        @InjectModel(ResourceModel)
        private resourceModule: typeof ResourceModel
    ) {
    }

    async findAll() {
        return await this.resourceModule.findAll();
    }

    async findOne(id: string) {
        return await this.resourceModule.findOne({
            where: {id}
        });
    }

}
