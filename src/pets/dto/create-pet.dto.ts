import { IsString, Length } from "class-validator";

export class CreatePetDto {
    @IsString({message: 'Name should be a string'})
    @Length(2, 20, {message: 'Name should be from 2 to 20 symbols'})
    readonly name: string;
    
    @IsString()
    readonly birth: string;

    @IsString({message: 'Should be a string'})
    readonly breed: string;

    @IsString({message: 'Should be a string'})
    readonly image: string;
    
    @IsString({message: 'Should be a string'})
    readonly comments: string;
}