import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CreateTypeProductCommandHandler } from "./type-product/commands/create-type_product.command";
import { DomainModule } from "src/domain/domain.module";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { PresentationModule } from "src/presentation/presentation.module";
import { CqrsModule } from "@nestjs/cqrs";
import { AutomapperModule } from "@automapper/nestjs";
import { classes } from "@automapper/classes";
import { MapperProfile } from "./mapper/mapper-profile";
import { JwtService } from "@nestjs/jwt";
import { SignUpCommandHandler } from "./auth/sign-up.command";
import { SignInCommandHandler } from "./auth/sign-in.command";
import { MyJwtService } from "src/presentation/services/jwt.service";
import { LoggerMiddleware } from "./middleware/logger.middle";

export const commandHandlers = [CreateTypeProductCommandHandler, SignUpCommandHandler, SignInCommandHandler];

@Module({
    imports: [
        PresentationModule,
        InfrastructureModule,
        DomainModule,
        CqrsModule,
        AutomapperModule.forRoot({
            strategyInitializer: classes(),
        }),
        // AutomapperModule.forFeature([MapperProfile]), 
    ],
    providers: [
        ...commandHandlers,
        MapperProfile,
        MyJwtService,
        JwtService,
    ],
})
export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes("*");

      }
}
