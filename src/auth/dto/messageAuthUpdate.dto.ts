import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ciryValid, emailValid } from 'src/auth/dto';
import { IsValidDate } from '../../decorators/dataValidate';

export class MessageAuthUpdateDto {
  @ApiProperty({ example: 'test@gmail.com' })
  @IsString({ message: 'Not a line' })
  @IsOptional()
  @IsEmail({})
  @Matches(emailValid.reg, {
    message: 'Incorrect email',
  })
  @MaxLength(emailValid.maxLength, { message: 'The maximum length of an email is 63 characters' })
  @MinLength(emailValid.minLength, { message: 'The minimum length of an email is 7 characters' })
  email: string;

  @ApiProperty({ example: '+380961122333' })
  @IsString({ message: 'Not a line' })
  @IsMobilePhone('uk-UA', { strictMode: true }, { message: 'Не валідний номер телефона' })
  @IsOptional()
  phone: string;

  @ApiProperty({ example: 'Kyiv' })
  @IsString({ message: 'Not a line' })
  @MinLength(ciryValid.minLength, { message: 'The city name must contain at least 2 characters' })
  @MaxLength(ciryValid.maxLength, { message: 'The maximum city length is 40 characters' })
  @Matches(ciryValid.reg, {
    message: 'The name of the city or region must contain only letters',
  })
  @IsOptional()
  city: string;

  @ApiProperty({ example: '00.00.0000' })
  @IsString({ message: 'Not a line' })
  @IsValidDate()
  @IsOptional()
  birthday: string;
}
