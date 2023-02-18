import { ApiProperty } from '@nestjs/swagger';
import { IsFile, IsFileSize } from 'src/decorators';

export class UploadedFilesDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
      example: "['https://team-project-react-node.s3.amazonaws.com/image/3f0cd17f-d25f-491a-8cce-00bf993edc5f.jpg']",
    },

    required: false,
  })
  @IsFile()
  @IsFileSize()
  readonly picture: string[];
}
