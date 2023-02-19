import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Matches, MinLength, IsMobilePhone } from 'class-validator';

export const passwordSchema = Object.freeze({
  upperCase: /(?=.*[A-Z])/,
  lowerCase: /(?=.*[a-z])/,
  symbol: /(?=.*[!@#$%^&*_])/,
  number: /(?=.*[0-9])/,
  min: /[0-9a-zA-Z!@#$%^&*_]{7,}/,
  lat: /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
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
    message: 'Password must contain a host one capital letter',
  })
  @Matches(passwordSchema.lowerCase, {
    message: 'Password must contain a host one small letter',
  })
  @Matches(passwordSchema.lat, {
    message: 'Password should only contain Latin letters, digits or special characters',
  })
  @MinLength(7, { message: 'The minimum length of password password' })
  // @Matches(passwordSchema.original, { message: 'Не валідний пароль' })
  readonly password: string;

  @ApiProperty({ example: 'Username' })
  @IsString({ message: 'Not a line' })
  @MinLength(2, { message: 'The name must contain at least 2 characters' })
  readonly name: string;

  @ApiProperty({ example: 'City' })
  @IsString({ message: 'Not a line' })
  @MinLength(2, { message: 'The city name must contain at least 2 characters' })
  readonly city: string;

  @ApiProperty({ example: '+380961122333' })
  @IsString({ message: 'Not a line' })
  @IsMobilePhone('uk-UA', { strictMode: true }, { message: 'Not a valid phone number' })
  readonly phone: string;
}
