import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Matches, MaxLength, MinLength } from 'class-validator';
import { emailValid } from 'src/helpers';

export class LogInDto {
  @ApiProperty({ example: 'User email' })
  @IsString({ message: 'Not a line' })
  @IsEmail({}, { message: 'Incorrect email' })
  @Matches(emailValid.reg.value, { message: emailValid.reg.message })
  @MaxLength(emailValid.maxLength.value, { message: emailValid.maxLength.message })
  @MinLength(emailValid.minLength.value, { message: emailValid.minLength.message })
  readonly email: string;

  @ApiProperty({ example: 'User password' })
  @IsString({ message: 'Not a line' })
  readonly password: string;
}
