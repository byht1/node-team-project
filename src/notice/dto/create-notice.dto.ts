import {
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { IsValidDate } from 'src/decorators';
import { CategoryNotices } from 'src/global/enum/categoryNotices';

export class CreateNoticeDto {
  @IsString({ message: '$property should be a string' })
  @IsIn(['sell', 'lost/found', 'in good hands'])
  readonly category: string;

  @IsString({ message: '$property should be a string' })
  @MinLength(2, { message: '$property should be from 2 symbols' })
  @MaxLength(48, { message: '$property should be maximum 48 symbols' })
  readonly title: string;

  @IsString({ message: '$property should be a string' })
  @MinLength(2, { message: '$property should be from 2 symbols' })
  @MaxLength(16, { message: '$property should be maximum 16 symbols' })
  @IsOptional()
  readonly name: string;

  @IsValidDate()
  @IsOptional()
  readonly birthday: string;

  @IsString({ message: '$property should be a string' })
  @IsOptional()
  readonly petType: string;

  @IsString({ message: '$property should be a string' })
  @MinLength(2, { message: '$property should be from 2 symbols' })
  @MaxLength(50, { message: '$property should be maximum 50 symbols' })
  @IsOptional()
  readonly breed: string;

  @IsString({ message: '$property should be a string' })
  @IsIn(['male', 'female'])
  readonly sex: string;

  @IsString({ message: '$property should be a string' })
  readonly location: string;

  @IsNumberString({}, { message: '$property should be a number' })
  @ValidateIf(o => o.category === CategoryNotices.SELL)
  @IsNotEmpty()
  readonly price?: string;

  @IsString({ message: '$property should be a string' })
  @MinLength(2, { message: '$property should be from 2 symbols' })
  @MaxLength(200, { message: '$property should be maximum 200 symbols' })
  @IsOptional()
  readonly comments: string;
}
