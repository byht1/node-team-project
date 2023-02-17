import { IsString, IsUrl, Length, IsDateString } from 'class-validator';

export class CreateNoticeDto {
  @IsString({ message: 'Title should be a string' })
  @Length(2, 50, { message: 'Title should be from 2 to 50 symbols' })
  readonly title: string;

  @IsString({ message: 'should be a string' })
  @Length(2, 16, { message: 'Name should be from 2 to 16 symbols' })
  readonly name: string;

  @IsUrl({}, { message: 'imgURL should be a URL' })
  readonly imgUrl: string;

  @IsDateString({}, { message: 'Birthday should be a date' })
  readonly birthday: Date;

  @IsString({ message: 'Bread should be a string' })
  readonly bread: string;

  @IsString({ message: 'Place should be a string' })
  readonly place: string;

  @IsString({ message: 'Sex should be a string' })
  readonly sex: string;

  @IsString({ message: 'Price should be a string' })
  readonly price: string;

  @IsString({ message: 'Category should be a string' })
  readonly category: string;

  @IsString({ message: 'should be a string' })
  @Length(2, 200, { message: 'Comments should be from 2 to 200 symbols' })
  readonly comments: string;
}
