import { IsNotEmpty, IsString } from 'class-validator';

export class PersonRequest {
    @IsString()
    @IsNotEmpty()
    tipo: string;

    @IsString()
    @IsNotEmpty()
    ruc: string;
}