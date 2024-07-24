import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ActionsEntity} from "../entity/actions.entity";
import {Repository} from "typeorm";

@Injectable()
export class ActionService {

    constructor(
        @InjectRepository(ActionsEntity)
        private actionsRepository: Repository<ActionsEntity>
    ) {
    }

}