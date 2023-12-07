import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class SingInRequest {

    @IsString()
    @IsEmail()
    email:string;
    
    @IsString()
    @IsNotEmpty()
    password: string;
}