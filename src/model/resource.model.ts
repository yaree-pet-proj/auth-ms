import {
    Column,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import {UUIDV4} from "sequelize";
import {DB_NAMES} from "../database/constants";
import {
    IsNotEmpty,
    IsString
} from "class-validator";

@Table({tableName: DB_NAMES.resources})
export class ResourceModel extends Model<ResourceModel> {

    @PrimaryKey
    @Column({type: 'UUID', defaultValue: UUIDV4})
    id: string;

    @Column({unique: true})
    name: string;

}

export class CreateResourceDto {

    @IsString()
    @IsNotEmpty()
    name: string;

}

export class ResourceDto {
    id: string;
    name: string;
    permissions: { id: string; name: string; }[];
}