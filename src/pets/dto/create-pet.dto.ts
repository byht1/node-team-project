import { IsString, Length } from 'class-validator';
import { ObjectId } from 'mongoose';
import { IsValidDate } from 'src/decorators';

export class CreatePetDto {
  @IsString({ message: 'Name should be a string' })
  @Length(2, 20, { message: 'Name should be from 2 to 20 symbols' })
  readonly name: string;

  @IsValidDate()
  @IsString()
  readonly birth: string;

  @IsString({ message: 'Should be a string' })
  readonly breed: string;

  @IsString({ message: 'Should be a string' })
  readonly comments: string;

  readonly owner: ObjectId;
}
