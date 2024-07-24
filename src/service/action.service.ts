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

    async findOne(payload): Promise<ActionsEntity | undefined> {
        return await this.actionsRepository.findOne({
            where: {id: payload.id}
        })
    }

    async findAll(): Promise<ActionsEntity[]> {
        return await this.actionsRepository.find();
    }

}