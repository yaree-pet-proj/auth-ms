import {Column, Model, PrimaryKey, Table} from "sequelize-typescript";
import {UUIDV4} from "sequelize";

@Table({tableName: 'resource'})
export class ResourceModel extends Model<ResourceModel> {

    @PrimaryKey
    @Column({type: 'UUID', defaultValue: UUIDV4})
    id?: string;

    @Column({unique: true})
    name: string;

}