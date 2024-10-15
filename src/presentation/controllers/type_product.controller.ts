import { Body, Controller, Inject, Post } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { CommandBus } from "@nestjs/cqrs";
import { ApiBearerAuth } from "@nestjs/swagger";
import { plainToClass } from "class-transformer";
import { CreateTypeProductCommand } from "src/application/type-product/commands/create-type_product.command";


@ApiBearerAuth()
@Controller('/type_product')
export class TypeProductController {
    constructor(
        private readonly commandBus: CommandBus,
    ) 
    { }

    @Post('/create') 
    async createTypeProduct(@Body() data: CreateTypeProductCommand) {

        const _data = plainToClass(CreateTypeProductCommand, data);
        
        return await this.commandBus.execute(_data);
    }  
}