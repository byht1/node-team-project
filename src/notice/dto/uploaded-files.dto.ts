import { ApiProperty } from '@nestjs/swagger';
import { IsFile, IsFileSize } from 'src/decorators';

export class UploadedFilesDto {
  @IsFile()
  @IsFileSize()
  readonly picture: string[];
}
