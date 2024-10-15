import { Column, Entity, PrimaryColumn } from "typeorm";
import * as uuid from "uuid";

@Entity()
export class CommonEntity {
    @PrimaryColumn()
    id: string = uuid.v4();

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date = new Date();

    @Column()
    createdBy: string;
}
