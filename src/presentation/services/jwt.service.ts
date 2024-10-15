import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Injectable } from '@nestjs/common';


@Injectable()
export class MyJwtService {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async generateAccessToken(payload: any): Promise<string> {
        const token = this.jwtService.sign(payload, {
            secret: this.configService.getOrThrow<string>('jwt.access_secret_key'),
            expiresIn: this.configService.getOrThrow<number>('jwt.access_expires_in'),
        });
        return token;
    }

    async generateRefreshToken(payload: any): Promise<string> {
        return this.jwtService.sign(payload, {
            secret: this.configService.getOrThrow<string>('jwt.refresh_secret_key'),
            expiresIn: this.configService.getOrThrow<number>('jwt.refresh_expires_in'),
        });
    }
}
