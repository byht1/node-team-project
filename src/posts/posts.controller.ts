import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto, UploadeFileDto } from './dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
// import { Post } from 'src/db-schema/post.schema';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    getAll() {
        return this.postsService.getAllPosts()
    }

    @Get('/:id')
    getOne(@Param('id') id: ObjectId) {
        return this.postsService.getPostById(id)
    }

    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
    @Post()
    createPost(@Body() dto: CreatePostDto, @UploadedFiles() { image }: UploadeFileDto) {
        return this.postsService.createPost(dto, image[0])
    }


    // getAllComments using .populate() with getOne()
    // 
    // @Post('/:id/comments') //or user/posts/:id/comments
    // creteComment() {}

    // *є на другій сторінці
    // @Put('/:id') {}
    // update(@Body() dto: UpdatePostDto, @UploadedFiles() { image }: UploadeFileDto) {
    //     return this.postsService.updatePost()
    // }

    @Delete(':id')
    remove(@Param('id') id: ObjectId) {
        return this.postsService.removePost(id)
    }
}
