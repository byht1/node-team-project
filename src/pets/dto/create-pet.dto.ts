import { IsString, Length} from "class-validator";
// import { ObjectId } from "mongoose";
import { IsValidDate } from 'src/decorators';

export class CreatePetDto {
  @IsString({ message: 'Name should be a string' })
  @Length(2, 20, { message: 'Name should be from 2 to 20 symbols' })
  readonly name: string;

  @IsValidDate()
  @IsString()
  readonly birth: string;

    @IsString({ message: 'Breed should be a string' })
    @Length(1, 50, {message: 'Breed should be a string and max length is 50 symbols'})
    readonly breed: string;

    @Length(8, 120, {message: 'Comments should be from 8 to 120 symbols'})
    @IsString({message: 'Comments should be a string'})
    readonly comments: string;

    // readonly owner: ObjectId;
}
