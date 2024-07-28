import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {PermissionModel} from "../model/permission.model";

@Injectable()
export class PermissionService {

    constructor(
        @InjectModel(PermissionModel)
        private permissionModel: typeof PermissionModel
    ) {
        this.permissionModel = permissionModel;
    }

    async findAll(resourceId: string) {
        return await this.permissionModel.findAll({
            where: {resource_id: resourceId}
        });
    }

    async createOne(payload: Partial<PermissionModel>) {
        return await this.permissionModel.create(payload);
    }

    async deleteOne(id: string) {
        return await this.permissionModel.destroy({
            where: {id}
        });
    }

}
