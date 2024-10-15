import { Column, Entity, PrimaryColumn } from "typeorm";
import { CommonEntity } from "../common/common.entity";

@Entity()
export class User extends CommonEntity {
    @Column()
    username: string;

    @Column()
    password: string;
}