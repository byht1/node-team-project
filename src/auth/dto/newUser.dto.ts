import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Matches, MinLength, IsMobilePhone } from 'class-validator';

export const passwordSchema = Object.freeze({
  upperCase: /(?=.*[A-Z])/,
  lowerCase: /(?=.*[a-z])/,
  symbol: /(?=.*[!@#$%^&*_])/,
  number: /(?=.*[0-9])/,
  min: /[0-9a-zA-Z!@#$%^&*_]{7,}/,
  original: /(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*_]{7,}/,
});

export class NewUserDto {
  @ApiProperty({ example: 'Email user' })
  @IsString({ message: 'Not a line' })
  @IsEmail({}, { message: 'Incorrect email' })
  @Matches(/^(?!-)\w{2,}@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/, {
    message: 'Incorrect email',
  })
  // @Matches(/^(?!.-.)([A-Za-z]{2,}@[A-Za-z]+.[A-Za-z]+)$/, {
  //   message: 'Incorrect email',
  // })
  readonly email: string;

  @ApiProperty({ example: 'Password user' })
  @IsString({ message: 'Not a line' })
  // @Matches(passwordSchema.number, {
  //   message: 'Пароль повинен містити хотяби одну цифру',
  // })
  // @Matches(passwordSchema.symbol, {
  //   message: 'Пароль повинен містити хотяби один сцеціальний символ !@#$%^&*_',
  // })
  @Matches(passwordSchema.upperCase, {
    message: 'Пароль повинен містити хотяби одну велику літеру',
  })
  @Matches(passwordSchema.lowerCase, {
    message: 'Пароль повинен містити хотяби одну маленьку літеру',
  })
  @MinLength(7, { message: 'Мінімум 7 симфолів' })
  // @Matches(passwordSchema.original, { message: 'Не валідний пароль' })
  readonly password: string;

  @ApiProperty({ example: 'Username' })
  @IsString({ message: 'Not a line' })
  readonly name: string;

  @ApiProperty({ example: 'City' })
  @IsString({ message: 'Not a line' })
  readonly city: string;

  @ApiProperty({ example: '+380961122333' })
  @IsString({ message: 'Not a line' })
  @IsMobilePhone('uk-UA', { strictMode: true }, { message: 'Не валідний номер телефона' })
  readonly phone: string;
}
