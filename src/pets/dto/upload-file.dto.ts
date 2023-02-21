import { IsFile, IsFileSize } from "src/decorators";

export class UploadFileDto {
    @IsFile()
    @IsFileSize()
    image: any;
}