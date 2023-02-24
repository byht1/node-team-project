import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchDto {
  @ApiProperty({ 
    description: 'Find post cards for the specified request (search by title)', 
    example: 'vet visits', 
    required: false })
  @IsOptional()
  @IsString({ message: 'Search query should be a string' })
  readonly searchQuery?: string;

  @ApiProperty({ description: 'Post quantity per page', example: '3', required: false })
  @IsOptional()
  readonly count?: number;

  @ApiProperty({ description: 'Quantity of skipped posts for the request', example: '0', required: false })
  @IsOptional()
  readonly offset?: number;
}
