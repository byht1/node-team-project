import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Matches, MaxLength, MinLength } from 'class-validator';
import { emailValid } from './newUser.dto';

export class LogInDto {
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
  readonly password: string;
}
