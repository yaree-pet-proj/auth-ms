import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity("resource")
export class ResourceEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        unique: true
    })
    name: string;

}