import { IsString, Length } from 'class-validator';

export class CreateComment {

    @IsString({ message: 'Title should be a string' })
    @Length(2, 200, {message: 'Text should be from 2 to 200 symbols'})
    readonly text: string;
}