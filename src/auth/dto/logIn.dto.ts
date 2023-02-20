import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Matches } from 'class-validator';

export class LogInDto {
  @ApiProperty({ example: 'Email user' })
  @IsString({ message: 'Not a line' })
  @IsEmail({}, { message: 'Incorrect email' })
  @Matches(/^(?!-)\w+(\.\w+)?@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/, {
    message: 'Incorrect email',
  })
  readonly email: string;

  @ApiProperty({ example: 'Password user' })
  @IsString({ message: 'Not a line' })
  readonly password: string;
}
