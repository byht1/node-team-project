import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsOptional, IsString, Matches } from 'class-validator';
import { IsValidDate } from '../../decorators/dataValidate';

export class EditingUserDto {
  @ApiProperty({ example: 'Vitalik' })
  @IsString({ message: 'Not a line' })
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'test@gmail.com' })
  @IsString({ message: 'Not a line' })
  @IsOptional()
  @IsEmail({})
  @Matches(/^(?!-)\w{2,}@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/, {
    message: 'Incorrect email',
  })
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

  @ApiProperty({ example: '00.00.0000' })
  // @Matches(/^(\d{2}).(\d{2}).(\d{4})(?![\d])$/, {
  //   message: 'The date does not match the pattern 00.00.0000',
  // })
  @IsString({ message: 'Not a line' })
  @IsValidDate()
  @IsOptional()
  birthday: string;
}
