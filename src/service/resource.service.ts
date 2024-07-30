import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {ResourceModel} from "../model/resource.model";

@Injectable()
export class ResourceService {

    constructor(
        @InjectModel(ResourceModel)
        private resourceModule: typeof ResourceModel
    ) {
        this.resourceModule = resourceModule;
    }

    async findAll() {
        return await this.resourceModule.findAll();
    }

    async findOne(id: string) {
        return await this.resourceModule.findOne({
            where: {id}
        });
    }

    async createOne(name: string): Promise<ResourceModel> {
        return await this.resourceModule.create({name});
    }

    async deleteOne(id: string) {
        return await this.resourceModule.destroy({
            where: {id}
        });
    }

    async updateOne(id: string, name: string): Promise<[number, ResourceModel[]]> {
        return await this.resourceModule.update({name}, {
            where: {id},
            returning: true
        });
    }

}
