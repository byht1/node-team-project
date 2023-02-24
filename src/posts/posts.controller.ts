import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Post, 
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
    ApiTags 
} from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { PostsService } from './posts.service';
import { CreatePostDto, UploadeFileDto } from './dto';
import { CreatePostSchema } from './schema-swagger/create-post.schema';
import { Post as PostDBSchema } from 'src/db-schema/post.schema';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ValidatePipe } from 'src/global/pipe/validate.pipe';
import { ValidateIsNotVoid } from 'src/global/pipe/validateIsNotVoid.pipe';
import { IRequestUser } from 'src/type/req';

@ApiTags('Blog')
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @ApiOperation({summary: 'Get all posts'})
    @ApiResponse({ status: 200, description: 'Posts found', type: [PostDBSchema] })
    @ApiResponse({ status: 500, description: 'Server error' })
    @Get()
    getAll() {
        return this.postsService.getAllPosts()
    }

    @ApiOperation({summary: 'Get post by id'})
    @ApiResponse({ status: 200, description: 'Post found', type: PostDBSchema })
    @ApiResponse({ status: 500, description: 'Server error' })
    @Get('/:id')
    getOne(@Param('id') id: ObjectId) {
        return this.postsService.getPostById(id)
    }

    @ApiOperation({summary: 'Create post'})
    @ApiBearerAuth()
    @ApiHeaders([
        {
            name: 'Authorization',
            required: true,
            description: 'User token',
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
        return this.postsService.createPost(dto, image[0], req.user)
    }

    @ApiOperation({ summary: 'Delete post' })
    @ApiBearerAuth()
    @ApiHeaders([
        {
            name: 'Authorization',
            required: true,
            description: 'User access token',
        },
    ])
    @ApiResponse({ status: 200, description: 'Post deleted', type: PostDBSchema })
    @ApiResponse({ status: 403, description: 'Invalid token' })
    @ApiResponse({ status: 404, description: 'Not Found' })
    @ApiResponse({ status: 500, description: 'Server error' })
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'id', required: true, description: 'Post ID' })
    @Delete(':id')
    remove(@Param('id') id: ObjectId, @Req() req: IRequestUser) {
        return this.postsService.removePost(id, req.user._id)
    }

    // getAllComments will be with using .populate() with getOnePost()

    // create comment
    // @ApiOperation({summary: 'Leave a comment on current post'}) // specified 
    // @Post('/:id/comments') //or posts/:id/comments  // user from Req()
    // creteComment(@Body() dto: CreatePostCommentDto) {
    //     return this.postsService.createComment(dto)
    // }
}
