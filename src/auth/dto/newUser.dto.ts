import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Matches, MinLength, IsMobilePhone, MaxLength } from 'class-validator';
import { ciryValid, emailValid, nameValid, passwordSchema } from 'src/helpers';

export class NewUserDto {
  @ApiProperty({ example: 'User email' })
  @IsString({ message: 'Not a line' })
  @IsEmail({}, { message: 'Incorrect email' })
  @Matches(emailValid.reg.value, { message: emailValid.reg.message })
  @MaxLength(emailValid.maxLength.value, { message: emailValid.maxLength.message })
  @MinLength(emailValid.minLength.value, { message: emailValid.minLength.message })
  readonly email: string;

  @ApiProperty({ example: 'User password' })
  @IsString({ message: 'Not a line' })
  @Matches(passwordSchema.upperCase.value, { message: passwordSchema.upperCase.message })
  @Matches(passwordSchema.lowerCase.value, { message: passwordSchema.lowerCase.message })
  @Matches(passwordSchema.lat.value, { message: passwordSchema.lat.message })
  @Matches(passwordSchema.number.value, { message: passwordSchema.number.message })
  @MaxLength(passwordSchema.max.value, { message: passwordSchema.max.message })
  @MinLength(passwordSchema.min.value, { message: passwordSchema.min.message })
  readonly password: string;

  @ApiProperty({ example: 'Username' })
  @IsString({ message: 'Not a line' })
  @MinLength(nameValid.minLength.value, { message: nameValid.minLength.message })
  @MaxLength(nameValid.maxLength.value, { message: nameValid.maxLength.message })
  @Matches(nameValid.reg.value, { message: nameValid.reg.message })
  readonly name: string;

  @ApiProperty({ example: 'City' })
  @IsString({ message: 'Not a line' })
  @MinLength(ciryValid.minLength.value, { message: ciryValid.minLength.message })
  @MaxLength(ciryValid.maxLength.value, { message: ciryValid.maxLength.message })
  @Matches(ciryValid.reg.value, { message: ciryValid.reg.message })
  readonly city: string;

  @ApiProperty({ example: '+380961122333' })
  @IsString({ message: 'Not a line' })
  @IsMobilePhone('uk-UA', { strictMode: true }, { message: 'Not a valid phone number' })
  readonly phone: string;
}
