import { IsFile, IsFileSize } from "src/decorators";

export class UploadFileDto {
    @IsFile()
    @IsFileSize()
    readonly image: any;
}
// @IsFile({ mime: ['', ''] }, { message: '' })