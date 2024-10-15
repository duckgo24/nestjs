
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { TypeProduct } from "./type_product.entity";
import { CommonEntity } from "../common/common.entity";

@Entity()
export class Product  extends CommonEntity {
    @Column()
    name: string;

    @Column()
    price: number;

    @ManyToOne(() => TypeProduct, typeProduct => typeProduct.products)
    type_product_id: TypeProduct;
}