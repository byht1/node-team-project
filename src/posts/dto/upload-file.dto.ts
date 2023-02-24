import { IsFile, IsFileSize } from 'src/decorators';

export class UploadeFileDto {
  @IsFile()
  @IsFileSize()
  readonly image: any;
}