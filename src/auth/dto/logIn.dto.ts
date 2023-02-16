import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class LogInDto {
  @ApiProperty({ example: 'Email user' })
  @IsString({ message: 'Not a line' })
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email: string;

  @ApiProperty({ example: 'Password user' })
  @IsString({ message: 'Not a line' })
  readonly password: string;
}
