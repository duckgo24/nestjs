import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./config/configuration";
import { TypeProductController } from "./controllers/type_product.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { AuthController } from "./controllers/auth.controller";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/auth.guard";
import { CurrentUser } from "./services/get-user.service"
import { MyJwtService } from "./services/jwt.service";
import { IUser } from "src/application/common/interfaces/IUser.interface";


@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true,
            envFilePath: '.env',
        }),
        CqrsModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secretOrPrivateKey: configService.getOrThrow<string>("jwt.access_secret_key"),
                signOptions: {
                    expiresIn: `${configService.getOrThrow<number>("jwt.access_expires_in")}s`,
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [TypeProductController, AuthController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        {
            provide: IUser,
            useClass: CurrentUser,
        },
        MyJwtService,
        JwtService,
    ],
    exports: [
        
    ],
})
export class PresentationModule { }

