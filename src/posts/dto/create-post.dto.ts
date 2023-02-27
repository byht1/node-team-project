import { IsString, Length } from "class-validator";

export class CreatePostDto {
    @IsString({ message: 'Title should be a string' })
    @Length(2, 60, { message: 'Name should be from 2 to 60 characters' })
    readonly title: string;

    @IsString({ message: 'Text should be a string' })
    @Length(8, 2000, { message: 'Text should be from 2 to 2000 characters' })
    readonly text: string;
    
    @IsString({ message: 'Category should be a string' })
    @Length(2, 14, { message: 'Category should be from 2 to 14 characters' })
    readonly category: string;
}
