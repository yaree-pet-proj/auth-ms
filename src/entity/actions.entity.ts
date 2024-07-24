import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity("actions")
export class ActionsEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        unique: true
    })
    name: string;

}