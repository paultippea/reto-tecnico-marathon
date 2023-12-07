import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class UserRequestDto {

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    lastname: string

    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(9)
    password: string
}