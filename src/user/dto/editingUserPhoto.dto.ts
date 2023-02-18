import { IsFile, IsFileSize } from 'src/decorators';

export class EditingUserPhotoDto {
  @IsFile({ mime: ['', ''] }, { message: '' })
  @IsFileSize()
  file?: string;
}
