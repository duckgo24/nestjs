import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ApiProperty } from "@nestjs/swagger";
import { plainToClass } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { EntityManager } from "typeorm";
import * as bcrypt from 'bcrypt';
import { User } from "src/domain/entities/user.entity";
import { HttpException } from "@nestjs/common";
import { MyJwtService } from "src/presentation/services/jwt.service";

export class SignInCommand {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
}

@CommandHandler(SignInCommand)
export class SignInCommandHandler implements ICommandHandler<SignInCommand, any> {
    constructor(
        private readonly em: EntityManager,
        private readonly jwtService: MyJwtService,
    ) { }
    async execute(command: SignInCommand) {
        const data = plainToClass(SignInCommand, command);
        const { username, password } = data;
        const isExitUser = await this.em.findOneByOrFail(User, { username });

        if (!isExitUser) {
            throw new HttpException('User not found', 404);
        }

        const isValidPassword = await bcrypt.compare(password, isExitUser.password);

        if (!isValidPassword) {
            throw new HttpException('Password is incorrect', 404);
        }
        const access_token = await this.jwtService.generateAccessToken({ id: isExitUser.id });
        const refresh_token = await this.jwtService.generateRefreshToken({ id: isExitUser.id });
        
        return {
            access_token,
            refresh_token,
        }

    }
}