import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MinLength, MaxLength } from 'class-validator';
import { passwordSchema } from 'src/helpers';

export class NewPasswordDto {
  @ApiProperty({ example: 'User password' })
  @IsString({ message: 'Not a line' })
  @Matches(passwordSchema.upperCase.value, { message: passwordSchema.upperCase.message })
  @Matches(passwordSchema.lowerCase.value, { message: passwordSchema.lowerCase.message })
  @Matches(passwordSchema.lat.value, { message: passwordSchema.lat.message })
  @Matches(passwordSchema.number.value, { message: passwordSchema.number.message })
  @MaxLength(passwordSchema.max.value, { message: passwordSchema.max.message })
  @MinLength(passwordSchema.min.value, { message: passwordSchema.min.message })
  readonly password: string;
}
