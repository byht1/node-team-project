import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentSchema {
    @ApiProperty({ 
        example: 'This article was really helpful! Thanks!', 
        description: 'Another user\'s comment on this post' })
    readonly text: string;
}