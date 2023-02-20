import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsPhoneNumber, IsEmail, Matches } from 'class-validator';
import { IsValidDate } from 'src/decorators';
import { CategoryNotices } from '../../global/enum/categoryNotices';

export class CreateNoticeDto {
  @IsString({ message: '$property should be a string' })
  @Length(2, 28, { message: '$propertyshould be from 2 to 50 symbols' })
  readonly title: string;

  @IsString({ message: '$property should be a string' })
  readonly petType: string;

  @IsString({ message: '$property should be a string' })
  @Length(2, 16, { message: '$propertyshould be from 2 to 16 symbols' })
  readonly name: string;

  @IsValidDate()
  readonly birthday: string;

  @IsString({ message: '$property should be a string' })
  @Length(2, 50, { message: '$propertyshould be from 2 to 16 symbols' })
  readonly breed: string;

  @IsString({ message: '$property should be a string' })
  readonly location: string;

  @IsString({ message: '$property should be a string' })
  readonly sex: string;

  @IsString({ message: '$property should be a string' })
  readonly price: string;

  @IsString({ message: '$property should be a string' })
  readonly category: CategoryNotices;

  @IsString({ message: '$property should be a string' })
  @Length(2, 200, { message: '$property should be from 2 to 200 symbols' })
  readonly comments: string;
}
