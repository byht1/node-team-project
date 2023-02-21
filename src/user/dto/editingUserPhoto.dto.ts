import { IsFile, IsFileSize } from 'src/decorators';

export class EditingUserPhotoDto {
  @IsFile()
  @IsFileSize()
  file: string;
}
