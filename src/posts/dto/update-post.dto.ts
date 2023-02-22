import { Length } from "class-validator";

export class UpdatePostDto {
    @Length(2, 48, { message: 'Name should be from 2 to 48 symbols' })
    readonly title: string;

    @Length(2, 200, { message: 'Name should be from 2 to 200 symbols' })
    readonly text: string;

    @Length(2, 28, { message: 'Category should be from 2 to 28 symbols' })
    readonly category: string; //string[]
}