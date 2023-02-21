import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Matches, MinLength, IsMobilePhone, MaxLength } from 'class-validator';

export const passwordSchema = Object.freeze({
  upperCase: /(?=.*[A-Z])/,
  lowerCase: /(?=.*[a-z])/,
  symbol: /(?=.*[!@#$%^&*_])/,
  number: /(?=.*[0-9])/,
  min: /[0-9a-zA-Z!@#$%^&*_]{7,}/,
  lat: /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
  original: /(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*_]{7,}/,
});

export const emailValid = {
  reg: /^(?!-)\w{2,}(\.\w+)*@[\w-]+(\.[\w-]+)*\.[a-zA-Z]{2,}$/,
  // reg: /^(?!-)\w{2,}(\.\w+)?@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/,
  maxLength: 63,
  minLength: 7,
};
export const nameValid = {
  reg: /^[A-Za-zА-Яа-яЁёҐґІіЇїЄє\s,'"'-.]+(?:\s+[A-Za-zА-Яа-яЁё]+){0,3}$/u,
  maxLength: 40,
  minLength: 2,
};
export const ciryValid = {
  reg: /^[a-zA-Zа-яА-Я\s,'"'-.]+$/,
  maxLength: 50,
  minLength: 2,
};

export class NewUserDto {
  @ApiProperty({ example: 'Email user' })
  @IsString({ message: 'Not a line' })
  @IsEmail({}, { message: 'Incorrect email' })
  @Matches(emailValid.reg, {
    message: 'Incorrect email reg',
  })
  @MaxLength(emailValid.maxLength, { message: 'The maximum length of an email is 63 characters' })
  @MinLength(emailValid.minLength, { message: 'The minimum length of an email is 7 characters' })
  readonly email: string;

  @ApiProperty({ example: 'Password user' })
  @IsString({ message: 'Not a line' })
  @Matches(passwordSchema.upperCase, {
    message: 'Password must contain a host one capital letter',
  })
  @Matches(passwordSchema.lowerCase, {
    message: 'Password must contain a host one small letter',
  })
  @Matches(passwordSchema.lat, {
    message: 'Password should only contain Latin letters, digits or special characters',
  })
  @MaxLength(32, { message: 'The maximum password length is 32 characters' })
  @MinLength(7, { message: 'The minimum password length is 7 characters' })
  readonly password: string;

  @ApiProperty({ example: 'Username' })
  @IsString({ message: 'Not a line' })
  @MinLength(nameValid.minLength, { message: 'The name must contain at least 2 characters' })
  @MaxLength(nameValid.maxLength, { message: 'The maximum name length is 40 characters' })
  @Matches(nameValid.reg, {
    message: 'The name may contain only letters of the Latin and Cyrillic alphabets',
  })
  readonly name: string;

  @ApiProperty({ example: 'City' })
  @IsString({ message: 'Not a line' })
  @MinLength(ciryValid.minLength, { message: 'The city name must contain at least 2 characters' })
  @MaxLength(ciryValid.maxLength, { message: 'The maximum city length is 40 characters' })
  @Matches(ciryValid.reg, {
    message: 'The name of the city or region must contain only letters',
  })
  readonly city: string;

  @ApiProperty({ example: '+380961122333' })
  @IsString({ message: 'Not a line' })
  @IsMobilePhone('uk-UA', { strictMode: true }, { message: 'Not a valid phone number' })
  readonly phone: string;
}
