import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ example: 'refresh_token' })
  @IsString({ message: 'Not a line' })
  readonly refresh_token: string;
}
