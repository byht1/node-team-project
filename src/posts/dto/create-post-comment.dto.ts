import { Length } from "class-validator";

export class CreatePostCommentDto {
    @Length(2, 200, { message: 'Name should be from 2 to 200 symbols' })
    readonly text: string;
}