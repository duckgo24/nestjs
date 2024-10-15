import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/domain/entities/product.entity';
import { TypeProduct } from 'src/domain/entities/type_product.entity';
import { CommonEntitySubscriber } from './data/EntitySubscriberInterface';
import { User } from 'src/domain/entities/user.entity';
import { IUser } from 'src/application/common/interfaces/IUser.interface';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get<string>('database.host'),
                port: configService.get<number>('database.port'),
                username: configService.get<string>('database.username'),
                password: configService.get<string>('database.password'),
                database: configService.get<string>('database.name'),
                entities: [TypeProduct, Product, User],
                subscribers: [CommonEntitySubscriber],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
    ],

    providers: [
        CommonEntitySubscriber,
        {
            provide: IUser,
            useValue: CommonEntitySubscriber
        },
        JwtService,
    ],
    exports: [TypeOrmModule],
})


export class InfrastructureModule { }