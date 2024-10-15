import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import * as uuid from "uuid";
import { Product } from "./product.entity";
import { CommonEntity } from "../common/common.entity";


@Entity()
export class TypeProduct extends CommonEntity {
    @Column()
    name: string;

    @OneToMany(() => Product, product => product.type_product_id)
    products: Product[];
}