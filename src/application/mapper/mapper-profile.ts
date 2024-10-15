import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { TypeProduct } from 'src/domain/entities/type_product.entity';
import { CreateTypeProductDto } from '../dto/type-product/create-type_product.dto';
import { SignUpDto } from '../dto/auth/sign-up.dto';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class MapperProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, CreateTypeProductDto, TypeProduct)
            createMap(mapper, SignUpDto, User)
        };
    }
}
