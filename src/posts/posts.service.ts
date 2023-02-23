import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { S3Service, TypeOperation } from 'src/AWS/s3.service';
import { Post, PostDocument } from 'src/db-schema/post.schema';
import { UserService } from 'src/user/user.service';
import { CreatePostDto, UploadeFileDto } from './dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<PostDocument>,
        private fileService: S3Service,
        private userService: UserService,
    ) {}

    async getAllPosts(): Promise<Post[]> {
        return await this.postModel.find().sort({'createdAt': -1});
    }

    async getPostById(id: ObjectId): Promise<Post> {
        const post = await this.postModel.findById(id);

        if(!post) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }

        return post;
    }

    async createPost(createPostDto: CreatePostDto, image: UploadeFileDto, userId: ObjectId): Promise<Post> {
        const fileName = await this.fileService.uploadFile(image, TypeOperation.POSTS);
        const post = await this.postModel.create({
            ...createPostDto, 
            image: fileName,
            owner: userId,
        });
        
        await this.userService.addPost(userId, post);

        return post;
    }

    async removePost(postId: ObjectId, userId: ObjectId): Promise<Post> {
        const postFind = await this.postModel.findById(postId);

        if(!postFind) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
        const string = postFind.image.split('/').pop();
        await this.fileService.deleteFile(string, TypeOperation.POSTS);
        const post = await this.postModel.findByIdAndRemove(postId).select({ createdAt: 0, updatedAt: 0 });

        await this.userService.removePost(userId, post);

        return post;
    }
}
