import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ciryValid, emailValid, nameValid } from 'src/helpers';
import { IsValidDate } from '../../decorators/dataValidate';

export class EditingUserDto {
  @ApiProperty({ example: 'James Allen' })
  @IsString({ message: 'Not a line' })
  @MinLength(nameValid.minLength.value, { message: nameValid.minLength.message })
  @MaxLength(nameValid.maxLength.value, { message: nameValid.maxLength.message })
  @Matches(nameValid.reg.value, { message: nameValid.reg.message })
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'test@gmail.com' })
  @IsString({ message: 'Not a line' })
  @IsOptional()
  @IsEmail({})
  @Matches(emailValid.reg.value, { message: emailValid.reg.message })
  @MaxLength(emailValid.maxLength.value, { message: emailValid.maxLength.message })
  @MinLength(emailValid.minLength.value, { message: emailValid.minLength.message })
  email?: string;

  @ApiProperty({ example: '+380961122333' })
  @IsString({ message: 'Not a line' })
  @IsMobilePhone('uk-UA', { strictMode: true }, { message: 'Не валідний номер телефона' })
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'Kyiv' })
  @IsString({ message: 'Not a line' })
  @MinLength(ciryValid.minLength.value, { message: ciryValid.minLength.message })
  @MaxLength(ciryValid.maxLength.value, { message: ciryValid.maxLength.message })
  @Matches(ciryValid.reg.value, { message: ciryValid.reg.message })
  @IsOptional()
  city?: string;

  @ApiProperty({ example: '00.00.0000' })
  @IsString({ message: 'Not a line' })
  @IsValidDate()
  @IsOptional()
  birthday?: string;
}
