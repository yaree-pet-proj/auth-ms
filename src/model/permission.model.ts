import {
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import {UUIDV4} from "sequelize";
import {ActionsModel} from "./actions.model";
import {ResourceModel} from "./resource.model";
import {DB_NAMES} from "../database/constants";

@Table({tableName: DB_NAMES.permissions})
export class PermissionModel extends Model<PermissionModel> {

    @PrimaryKey
    @Column({type: 'UUID', defaultValue: UUIDV4})
    id: string;

    @ForeignKey(() => ActionsModel)
    @Column({type: 'UUID'})
    action_id: string;

    @ForeignKey(() => ResourceModel)
    @Column({type: 'UUID'})
    resource_id: string;

}