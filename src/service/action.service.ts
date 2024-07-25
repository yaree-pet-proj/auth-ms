import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {ActionsModel} from "../model/actions.model";

@Injectable()
export class ActionService {

    constructor(
        @InjectModel(ActionsModel)
        private actionsModel: typeof ActionsModel
    ) {
    }

    async findOne(id: string): Promise<ActionsModel | undefined> {
        return await this.actionsModel.findOne({
            where: {id}
        })
    }

    async findAll(): Promise<ActionsModel[]> {
        return await this.actionsModel.findAll();
    }

}