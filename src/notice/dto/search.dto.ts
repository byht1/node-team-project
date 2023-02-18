import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CategoryNotices } from '../../global/enum/categoryNotices';

export class SearchDto {
  @ApiProperty({ example: "One of 'sell', 'lost/found', 'in good hands'" })
  @IsString({ message: 'Not a line' })
  @IsEnum(CategoryNotices)
  readonly category?: CategoryNotices;

  @ApiProperty({ example: 'Beautiful cat', required: false })
  @IsOptional()
  @IsString({ message: 'Not a line' })
  readonly search?: string;
}
