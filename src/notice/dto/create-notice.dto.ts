import {
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { IsValidDate } from 'src/decorators';
// import { IsDateFormatWhithinRange } from 'src/decorators/isDateFormatWhithinRange';
import { CategoryNotices } from 'src/global/enum/categoryNotices';
import { fieldsValid } from 'src/helpers';

export class CreateNoticeDto {
  @IsString({ message: '$property should be a string' })
  @IsIn(['sell', 'lost/found', 'in good hands'])
  readonly category: string;

  @IsString({ message: '$property should be a string' })
  @MinLength(2, { message: '$property should be from 2 symbols' })
  @MaxLength(48, { message: '$property should be maximum 48 symbols' })
  @Matches(fieldsValid.emptyField.value, { message: fieldsValid.emptyField.message })
  @Matches(fieldsValid.allowedCharacters.value, { message: fieldsValid.allowedCharacters.message })
  readonly title: string;

  @IsString({ message: '$property should be a string' })
  @MinLength(2, { message: '$property should be from 2 symbols' })
  @MaxLength(16, { message: '$property should be maximum 16 symbols' })
  @Matches(fieldsValid.emptyField.value, { message: fieldsValid.emptyField.message })
  @Matches(fieldsValid.allowedCharacters.value, { message: fieldsValid.allowedCharacters.message })
  @IsOptional()
  readonly name: string;

  // @IsDateFormatWhithinRange('dd.MM.yyyy', '01.01.1900', new Date().toLocaleDateString())
  @IsValidDate({})
  @IsOptional()
  readonly birthday: string;

  @IsString({ message: '$property should be a string' })
  @Matches(fieldsValid.emptyField.value, { message: fieldsValid.emptyField.message })
  @Matches(fieldsValid.allowedCharacters.value, { message: fieldsValid.allowedCharacters.message })
  @Matches(fieldsValid.oneWord.value, { message: fieldsValid.oneWord.message })
  @IsOptional()
  readonly petType: string;

  @IsString({ message: '$property should be a string' })
  @MinLength(2, { message: '$property should be from 2 symbols' })
  @MaxLength(50, { message: '$property should be maximum 50 symbols' })
  @Matches(fieldsValid.emptyField.value, { message: fieldsValid.emptyField.message })
  @Matches(fieldsValid.allowedCharacters.value, { message: fieldsValid.allowedCharacters.message })
  @IsOptional()
  readonly breed: string;

  @IsString({ message: '$property should be a string' })
  @IsIn(['male', 'female'])
  readonly sex: string;

  @IsString({ message: '$property should be a string' })
  @Matches(fieldsValid.emptyField.value, { message: fieldsValid.emptyField.message })
  @Matches(fieldsValid.allowedCharacters.value, { message: fieldsValid.allowedCharacters.message })
  readonly location: string;

  @IsNumberString({}, { message: '$property should be a number' })
  @ValidateIf(o => o.category === CategoryNotices.SELL)
  @Matches(fieldsValid.emptyField.value, { message: fieldsValid.emptyField.message })
  @IsNotEmpty()
  readonly price?: string;

  @IsString({ message: '$property should be a string' })
  @MinLength(2, { message: '$property should be from 2 symbols' })
  @MaxLength(200, { message: '$property should be maximum 200 symbols' })
  @Matches(fieldsValid.emptyField.value, { message: fieldsValid.emptyField.message })
  @IsOptional()
  readonly comments: string;
}
