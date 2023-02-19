import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';
import { CategoryNotices } from '../../global/enum/categoryNotices';

export class SearchDto {
  @ApiProperty({ description: "One of category 'sell', 'lost/found', 'in good hands'", example: 'sell' })
  @IsOptional()
  @IsString({ message: 'Not a line' })
  @IsEnum(CategoryNotices)
  readonly category?: CategoryNotices;

  @ApiProperty({ description: 'Search by title', example: 'Beautiful cat', required: false })
  @IsOptional()
  @IsString({ message: 'Not a line' })
  readonly search?: string;

  @ApiProperty({ description: 'Amount of ads per page', example: '10', required: false })
  @IsOptional()
  @IsNumberString()
  readonly count?: number;

  @ApiProperty({ description: 'Page number from which the counting starts', example: '0', required: false })
  @IsOptional()
  @IsNumberString()
  readonly offset?: number;
}
