import { IsString, Length, IsDateString, IsPhoneNumber, IsEmail } from 'class-validator';

export class CreateNoticeDto {
  // @IsString({ message: 'Title should be a string' })
  // @Length(2, 50, { message: 'Title should be from 2 to 50 symbols' })
  readonly title: string;

  // @IsString({ message: 'should be a string' })
  // @Length(2, 16, { message: 'Name should be from 2 to 16 symbols' })
  readonly name: string;

  // @IsDateString({}, { message: 'Birthday should be a date' })
  readonly birthday: string;

  // @IsString({ message: 'Bread should be a string' })
  readonly bread: string;

  // @IsString({ message: 'Place should be a string' })
  readonly place: string;

  // @IsString({ message: 'Sex should be a string' })
  readonly sex: string;

  // @IsString({ message: 'Price should be a string' })
  readonly price: string;

  // @IsString({ message: 'Category should be a string' })
  readonly category: string;

  // @IsString({ message: 'should be a string' })
  // @Length(2, 200, { message: 'Comments should be from 2 to 200 symbols' })
  readonly comments: string;

  // @IsString({ message: 'should be a string' })
  // @IsPhoneNumber()
  readonly phone: string;

  @IsString({ message: 'should be a string' })
  @IsEmail()
  readonly email: string;
}
