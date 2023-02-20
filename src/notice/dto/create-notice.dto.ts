
import { IsNotEmpty, IsOptional, IsString, Length, ValidateIf } from 'class-validator';
import { IsValidDate } from 'src/decorators';
import { CategoryNotices } from 'src/global/enum/categoryNotices';

export class CreateNoticeDto {
  @IsString({ message: '$property should be a string' })
  readonly category: CategoryNotices;

  @IsString({ message: '$property should be a string' })
  @Length(2, 28, { message: '$property should be from 2 to 50 symbols' })
  readonly title: string;

  @IsString({ message: '$property should be a string' })
  @Length(2, 16, { message: '$property should be from 2 to 16 symbols' })
  @IsOptional()
  readonly name: string;

  @IsValidDate()
  @IsOptional()
  readonly birthday: string;

  @IsString({ message: '$property should be a string' })
  @IsOptional()
  readonly petType: string;

  @IsString({ message: '$property should be a string' })
  @Length(2, 50, { message: '$property should be from 2 to 16 symbols' })
  @IsOptional()
  readonly breed: string;

  @IsString({ message: '$property should be a string' })
  readonly sex: string;

  @IsString({ message: '$property should be a string' })
  readonly location: string;
  
  @ValidateIf(o => o.category === CategoryNotices.SELL)
  @IsNotEmpty()
  readonly price?: string;

  @IsString({ message: '$property should be a string' })
  @ValidateIf(o => o.category === CategoryNotices.SELL)
  @IsNotEmpty()
  readonly price?: string;

  @IsString({ message: '$property should be a string' })
  @Length(2, 200, { message: '$property should be from 2 to 200 symbols' })
  @IsOptional()
  readonly comments: string;
}
