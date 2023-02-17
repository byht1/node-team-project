import { IsEnum } from 'class-validator';

export class SearchDto {
  @IsEnum(
    { entity: ['sell', 'lost-found', 'for-free'] },
    { message: "Cathegory should be on of: ['sell', 'lost-found', 'for-free']" },
  )
  readonly category?: string;
}
