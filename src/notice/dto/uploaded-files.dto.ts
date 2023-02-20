import { IsOptional } from 'class-validator';
import { IsFile, IsFileSize } from 'src/decorators';

export class UploadedFilesDto {
  @IsFile()
  @IsFileSize()
  @IsOptional()
  readonly picture: string[];
}
