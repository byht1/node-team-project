import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsOptional, IsString } from 'class-validator';

export class EditingUserDto {
  @ApiProperty({ example: 'Vitalik' })
  @IsString({ message: 'Not a line' })
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'test@gmail.com' })
  @IsString({ message: 'Not a line' })
  @IsOptional()
  @IsEmail({})
  email?: string;

  @ApiProperty({ example: '+380961122333' })
  @IsString({ message: 'Not a line' })
  @IsMobilePhone('uk-UA', { strictMode: true }, { message: 'Не валідний номер телефона' })
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'Kiev' })
  @IsString({ message: 'Not a line' })
  @IsOptional()
  city?: string;
}
