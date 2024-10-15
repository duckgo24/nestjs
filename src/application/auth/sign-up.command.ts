import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ApiProperty } from "@nestjs/swagger";
import { plainToClass, plainToInstance } from "class-transformer"; // Use plainToInstance
import { IsNotEmpty } from "class-validator";
import { User } from "src/domain/entities/user.entity";
import { EntityManager } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Mapper } from "@automapper/core";
import { SignUpDto } from "../dto/auth/sign-up.dto";
import { InjectMapper } from "@automapper/nestjs";
import { BadRequestException, HttpException } from "@nestjs/common";

export class SignUpCommand {
    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
}

@CommandHandler(SignUpCommand)
export class SignUpCommandHandler implements ICommandHandler<SignUpCommand, any> {
    constructor(
        private readonly em: EntityManager,
    ) { }

    async execute(command: SignUpCommand) {
        const userEntity = plainToClass(User, command);
        const hashPassword = await bcrypt.hash(userEntity.password, 10);
    
        // Check if the user exists
        const isUserExit = await this.em.findOneBy(User, { username: userEntity.username });
    
        // If the user exists, throw an exception
        if (isUserExit) {
            throw new BadRequestException('User already exists');
        }
    
        // Create an instance of the User entity
        const newUser = this.em.create(User, {
            username: userEntity.username,
            password: hashPassword
        });
    
        // Save the new user instance
        return await this.em.save(newUser);
    }
    
    
}
