import {
    Column,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import {UUIDV4} from "sequelize";
import {DB_NAMES} from "../database/constants";

@Table({tableName: DB_NAMES.actions})
export class ActionsModel extends Model<ActionsModel> {

    @PrimaryKey
    @Column({type: 'UUID', defaultValue: UUIDV4})
    id: string;

    @Column({unique: true})
    name: string;

}