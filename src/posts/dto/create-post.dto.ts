import { IsString, Length, MinLength } from "class-validator";

export class CreatePostDto {
    @IsString({ message: 'Title should be a string' })
    @Length(2, 48, { message: 'Name should be from 2 to 48 characters' })
    readonly title: string;

    @IsString({ message: 'Text should be a string' })
    @MinLength(8, { message: 'Text should be at least 8 characters' })
    readonly text: string;
    
    @IsString({ message: 'Category should be a string' })
    @Length(2, 28, { message: 'Category should be from 2 to 28 characters' })
    readonly category: string;
}
