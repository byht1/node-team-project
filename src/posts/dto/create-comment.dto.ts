import { IsString, Length, Matches, MaxLength, MinLength } from 'class-validator';
import { commentValid } from 'src/helpers/valideitReg/comment';

export class CreateCommentDto {
    @IsString({ message: 'Text should be a string' })
    @Matches(commentValid.emptyField.value, {message: commentValid.emptyField.message})
    @MinLength(commentValid.minLength.value, {message: commentValid.minLength.message})
    @MaxLength(commentValid.maxLength.value, {message: commentValid.maxLength.message})
    readonly text: string;
}

// export class CreateCommentDto {
//     @IsString({ message: 'Text should be a string' })
//     @Matches(commentValid.emptyField.value, {message: commentValid.emptyField.message})
//     // @MinLength(commentValid.minLength.value, {message: commentValid.minLength.message})
//     // @MaxLength(commentValid.maxLength.value, {message: commentValid.maxLength.message})
//     @MinLength(2, {message: '2 symbols'})
//     @MaxLength(200, {message: '200 symbols'})
//     // @Length(2, 200, {message: 'Text should be from 2 to 200 symbols'})
//     readonly text: string;
// }

    // @Length(2, 200, {message: 'Text should be from 2 to 200 symbols'})