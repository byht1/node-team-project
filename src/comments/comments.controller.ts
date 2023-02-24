import { Controller } from '@nestjs/common';

@Controller('comments')
export class CommentsController {
    // create comment
    // @ApiOperation({summary: 'Leave a comment on the current post'}) // specified 
    // @ApiBearerAuth()
    // @ApiHeaders([
    //     {
    //         name: 'Authorization',
    //         required: true,
    //         description: 'User access token',
    //     },
    // ])
    // @ApiBody({ type: CreateCommentSchema })
    // @ApiConsumes('multipart/form-data')
    // @ApiResponse({ status: 201, description: 'Comment created', type: PostDBSchema })
    // @ApiResponse({ status: 400, description: 'Bad Request' })
    // @ApiResponse({ status: 403, description: 'Invalid token' })
    // @ApiResponse({ status: 500, description: 'Server error' })
    // @UseGuards(JwtAuthGuard)
    // @ApiParam({ name: 'id', required: true, description: 'Post ID' })
    // @Post(':id/comments')  // user from Req() // comments/:id/
    // creteComment(@Body() dto: CreatePostCommentDto, ) {
    //     // return this.postsService.createComment(dto)
    // }
}
