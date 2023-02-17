import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export enum Category {
  SELL = 'sell',
  LOST_FOUND = 'lost-found',
  FOR_FREE = 'for-free',
}

export class SearchDto {
  @ApiProperty({ example: ['sell', 'lost-found', 'for-free'] })
  @IsString({ message: 'Not a line' })
  @IsEnum(Category)
  readonly category?: Category = Category.SELL;
}
