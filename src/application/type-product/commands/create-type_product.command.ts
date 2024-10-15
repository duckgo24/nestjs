import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ApiProperty } from "@nestjs/swagger";
import { plainToClass } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { CreateTypeProductDto } from "src/application/dto/type-product/create-type_product.dto";
import { TypeProduct } from "src/domain/entities/type_product.entity";
import { EntityManager } from "typeorm";



export class CreateTypeProductCommand {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public name: string
}

@CommandHandler(CreateTypeProductCommand )
export class CreateTypeProductCommandHandler implements ICommandHandler<CreateTypeProductCommand , CreateTypeProductDto> {
    constructor(
        private readonly em: EntityManager,
        @InjectMapper() private readonly mapper: Mapper
    ) { }

    async execute(command: CreateTypeProductCommand ): Promise<any> {
        const typeProduct = plainToClass(TypeProduct, command)
        const res = await this.em.save(typeProduct)
        // return this.mapper.map(res, CreateTypeProductDto, TypeProduct)
        return res;
    }
}