import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Patch, 
    Post, 
    Query, 
    Req, 
    UploadedFiles, 
    UseGuards, 
    UseInterceptors, 
    UsePipes,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { 
    ApiBearerAuth, 
    ApiBody, 
    ApiConsumes, 
    ApiHeaders, 
    ApiOperation, 
    ApiParam, 
    ApiResponse, 
    ApiTags, 
} from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { PostsService } from './posts.service';
import { CreateCommentDto, CreatePostDto, SearchDto, UploadeFileDto } from './dto';
import { CreatePostSchema, GetAllPostsSchema, GetOnePostSchema } from './schema-swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ValidatePipe } from 'src/global/pipe/validate.pipe';
import { ValidateIsNotVoid } from 'src/global/pipe/validateIsNotVoid.pipe';
import { IRequestUser } from 'src/type/req';
import { Post as PostDBSchema } from 'src/db-schema/post.schema';
import { Comment as CommentDBSchema } from 'src/db-schema/comments.schema';
import { CommentsService } from 'src/comments/comments.service';
import { CreateCommentSchema } from 'src/comments/schema-swagger/create-comment.schema';

@ApiTags('Blog')
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService,
        private readonly commentsService: CommentsService) {}

    @ApiOperation({summary: 'Get all posts'})
    @ApiBearerAuth()
    @ApiHeaders([
        {
            name: 'Authorization',
            required: true,
            description: 'User access token',
        },
    ])
    @ApiResponse({ status: 200, description: 'Posts found', type: [GetAllPostsSchema] })
    @ApiResponse({ status: 403, description: 'Invalid token' })
    @ApiResponse({ status: 500, description: 'Server error' })
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllPosts(@Query() dto: SearchDto) {
        return this.postsService.getAllPosts(dto)
    }

    @ApiOperation({summary: 'Get post by id'})
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Post found', type: GetOnePostSchema })
    @ApiResponse({ status: 403, description: 'Invalid token' })
    @ApiResponse({ status: 500, description: 'Server error' })
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'postId', required: true, description: 'Post ID' })
    @ApiHeaders([
        {
            name: 'Authorization',
            required: true,
            description: 'User access token',
        },
    ])
    @Get('/:postId')
    getOnePost(@Param('postId') id: ObjectId) {
        return this.postsService.getPostById(id)
    }

    @ApiOperation({summary: 'Create post'})
    @ApiBearerAuth()
    @ApiHeaders([
        {
            name: 'Authorization',
            required: true,
            description: 'User access token',
        },
      ])
    @ApiBody({ type: CreatePostSchema })
    @ApiConsumes('multipart/form-data')
    @ApiResponse({ status: 201, description: 'Post created', type: PostDBSchema })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 403, description: 'Invalid token' })
    @ApiResponse({ status: 500, description: 'Server error' })
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidatePipe)
    @UsePipes(ValidateIsNotVoid)
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
    @Post()
    createPost(@Req() req: IRequestUser, @Body() dto: CreatePostDto, @UploadedFiles() { image }: UploadeFileDto) {
        return this.postsService.createPost(dto, image[0], req.user._id)
    }

    @ApiOperation({ summary: 'Delete post' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Post deleted', type: PostDBSchema })
    @ApiResponse({ status: 403, description: 'Invalid token' })
    @ApiResponse({ status: 404, description: 'Not Found' })
    @ApiResponse({ status: 500, description: 'Server error' })
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'postId', required: true, description: 'Post ID' })
    @ApiHeaders([
        {
            name: 'Authorization',
            required: true,
            description: 'User access token',
        },
    ])
    @Delete(':postId')
    removePost(@Param('postId') postId: ObjectId, @Req() req: IRequestUser) {
        this.commentsService.removeAllPostComments(postId);
        return this.postsService.removePost(postId, req.user._id);
    }

    @ApiOperation({ summary: 'Add or remove \'like\' mark' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 200, description: 'Post \'likes\' field updated', type: PostDBSchema })
    @ApiResponse({ status: 403, description: 'Invalid token' })
    @ApiResponse({ status: 404, description: 'Not Found' })
    @ApiResponse({ status: 500, description: 'Server error' })
    @ApiParam({ name: 'postId', required: true, description: 'Post ID' })
    @ApiHeaders([
        {
            name: 'Authorization',
            required: true,
            description: 'User access token',
        },
    ])
    @Patch(':postId/likes')
    likes(@Param('postId') id: ObjectId, @Req() req: IRequestUser) {
        return this.postsService.likes(id, req.user._id)
    }

    @ApiOperation({ summary: 'Add comment' })
    @ApiBearerAuth()
    @ApiBody({ type: CreateCommentSchema })
    @ApiConsumes('multipart/form-data')
    @ApiResponse({ status: 201, description: 'Comment created', type: CommentDBSchema })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 403, description: 'Invalid token' })
    @ApiResponse({ status: 500, description: 'Server error' })
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'postId', required: true, description: 'Post ID' })
    @ApiHeaders([
        {
            name: 'Authorization',
            required: true,
            description: 'User access token',
        },
    ])
    @Post(':postId/comments')
    addComment(@Param('postId') postId: ObjectId, 
    @Req() req: IRequestUser,
    @Body() dto: CreateCommentDto) {
        return this.commentsService.createComment(dto, postId, req.user._id)
    }

    @ApiOperation({ summary: 'Delete comment' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Comment deleted', type: CommentDBSchema })
    @ApiResponse({ status: 403, description: 'Invalid token' })
    @ApiResponse({ status: 404, description: 'Not Found' })
    @ApiResponse({ status: 500, description: 'Server error' })
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'commentId', required: true, description: 'Comment ID' })
    @ApiParam({ name: 'postId', required: true, description: 'Post ID' })
    @ApiHeaders([
        {
            name: 'Authorization',
            required: true,
            description: 'User access token',
        },
    ])
    @Delete(':postId/comments/:commentId')
    removeComment(@Param('postId') postId: ObjectId,
    @Req() req: IRequestUser,
    @Param('commentId') commentId: ObjectId) {
        return this.commentsService.removeComment(commentId, postId, req.user._id)
    }
}
