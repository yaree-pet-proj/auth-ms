import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {PermissionsEntity} from "../entity/permissions.entity";
import {Repository} from "typeorm";

@Injectable()
export class PermissionService {

    constructor(
        @InjectRepository(PermissionsEntity)
        private permissionRepository: Repository<PermissionsEntity>
    ) {
    }

}