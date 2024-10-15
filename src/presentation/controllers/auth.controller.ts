import { Body, Controller, Post, Res, Get } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { plainToClass } from "class-transformer";
import { SignInCommand } from "src/application/auth/sign-in.command";
import { SignUpCommand } from "src/application/auth/sign-up.command";
import { AllowAnonymous } from "../auth/allow-anonymous";
import { Response } from "express";
import { ApiBearerAuth } from "@nestjs/swagger";
import { IUser } from "src/application/common/interfaces/IUser.interface";


@ApiBearerAuth()
@Controller('/auth')
export class AuthController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly currentUser: IUser,
    ) { }

    @Get('/me')
    async me() {
        return {
            user_id: this.currentUser.getCurrentUser(),
        }
    }


    @AllowAnonymous()
    @Post('/login')
    async login(@Body() data: SignInCommand, @Res() res: Response) {
        const _data = plainToClass(SignInCommand, data);
        const { access_token, refresh_token } = await this.commandBus.execute(_data);
        res.cookie('access_token', access_token, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 days
        });

        res.cookie('refresh_token', refresh_token, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365) // 1 year
        });

        return res.status(200).json({ access_token, refresh_token });
    }

    @AllowAnonymous()
    @Post('/register')
    async register(@Body() data: SignUpCommand) {
        
        const _data = plainToClass(SignUpCommand, data);
        return await this.commandBus.execute(_data);
    }
}