import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {PermissionModel} from "../model/permission.model";

@Injectable()
export class PermissionService {

    constructor(
        @InjectModel(PermissionModel)
        private permissionModel: typeof PermissionModel
    ) {
    }

}