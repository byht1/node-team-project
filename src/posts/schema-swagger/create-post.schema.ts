import { ApiProperty } from "@nestjs/swagger";

export class CreatePostSchema {
    @ApiProperty({ example: 'Post title', description: 'Post title' })
    readonly title: string;

    @ApiProperty({ example: 'Post text', description: 'Post description' })
    readonly text: string;

    @ApiProperty({ example: 'veterinary', description: 'Post category' })
    readonly category: string;

    @ApiProperty({ example: 'post.jpg', description: 'Post photo' })
    readonly image: any;
}