import {Column, Model, PrimaryKey, Table} from "sequelize-typescript";
import {UUIDV4} from "sequelize";
import {DB_NAMES} from "../database/constants";

@Table({tableName: DB_NAMES.resources})
export class ResourceModel extends Model<ResourceModel> {

    @PrimaryKey
    @Column({type: 'UUID', defaultValue: UUIDV4})
    id: string;

    @Column({unique: true})
    name: string;

}