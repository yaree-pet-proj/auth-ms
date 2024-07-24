import {
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {ActionsEntity} from "./actions.entity";
import {ResourceEntity} from "./resource.entity";

@Entity()
export class PermissionsEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => ActionsEntity)
    @JoinColumn({name: 'action_id'})
    action_id: ActionsEntity;

    @ManyToOne(() => ResourceEntity)
    @JoinColumn({name: 'resource_id'})
    resource_id: ResourceEntity;

}