import { IsString, Length, Matches } from 'class-validator';

export class CreateCommentDto {
    @IsString({ message: 'Text should be a string' })
    @Matches(/^\s*\S/, { message: 'The field shouldn\'t be empty' })
    @Length(2, 200, {message: 'Text should be from 2 to 200 symbols'})
    readonly text: string;
}