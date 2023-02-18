import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsPhoneNumber, IsEmail, Matches } from 'class-validator';
import { IsValidDate } from 'src/decorators';
import { CategoryNotices } from '../../global/enum/categoryNotices';

export class CreateNoticeDto {
  @ApiProperty({ example: 'Сute dog looking for a home' })
  @IsString({ message: '$property should be a string' })
  @Length(2, 28, { message: '$propertyshould be from 2 to 50 symbols' })
  readonly title: string;

  @ApiProperty({
    example: 'Dog',
    required: false,
  })
  @IsString({ message: '$property should be a string' })
  readonly petType: string;

  @ApiProperty({
    example: 'Rich',
    required: false,
  })
  @IsString({ message: '$property should be a string' })
  @Length(2, 16, { message: '$propertyshould be from 2 to 16 symbols' })
  readonly name: string;

  @ApiProperty({
    example: '2020-08-31',
    required: false,
  })
  @IsValidDate()
  readonly birthday: string;

  @ApiProperty({
    example: 'Pomeranian',
    required: false,
  })
  @IsString({ message: '$property should be a string' })
  @Length(2, 50, { message: '$propertyshould be from 2 to 16 symbols' })
  readonly bread: string;

  @ApiProperty({
    example: 'Lviv',
    required: false,
  })
  @IsString({ message: '$property should be a string' })
  readonly location: string;

  @ApiProperty({
    example: ['male', 'female'],
    required: false,
  })
  @IsString({ message: '$property should be a string' })
  readonly sex: string;

  @ApiProperty({
    example: '150uah',
  })
  @IsString({ message: '$property should be a string' })
  readonly price: string;

  @ApiProperty({
    example: ['sell', 'lost/found', 'in good hands'],
  })
  @IsString({ message: '$property should be a string' })
  readonly category: CategoryNotices;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur  Lorem ipsum dolor sit amet, consectetur Lorem',
  })
  @IsString({ message: '$property should be a string' })
  @Length(2, 200, { message: '$property should be from 2 to 200 symbols' })
  readonly comments: string;
}
