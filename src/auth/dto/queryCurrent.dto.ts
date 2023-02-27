import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class QueryCurrentDto {
  @ApiProperty({ description: "One of category 'google'", example: 'google', required: false })
  @IsOptional()
  @IsString({ message: 'Not a line' })
  readonly type?: string;

  @ApiProperty({ description: 'Query fields', example: 'advertisement,cards,...', required: false })
  @IsOptional()
  @IsString({ message: 'Not a line' })
  readonly fields?: string;
}
