import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { S3Service, TypeOperation } from 'src/AWS/s3.service';
import { Post, PostDocument } from 'src/db-schema/post.schema';
// import { UserService } from 'src/user/user.service';
import { CreatePostDto, UploadeFileDto } from './dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<PostDocument>,
        private fileService: S3Service,
        // private userService: UserService,
    ) {}

    // #1  // useEffect [] // 1.можлива пагнація і 2.сортувння по даті створення поста
    async getAllPosts(): Promise<Post[]> {
        return await this.postModel.find()
    }

    // get by click on PostCardButton *with route
    async getPostById(id: ObjectId): Promise<Post> {
        const post = await this.postModel.findById(id)
        if(!post) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
        return post;
    }

    // this is a Modal on first page
    async createPost(createPostDto: CreatePostDto, image: UploadeFileDto): Promise<Post> {
        const fileName = await this.fileService.uploadFile(image, TypeOperation.POSTS);
        const post = await this.postModel.create({
            ...createPostDto, 
            image: fileName,
            // owner: userId, // don't touch
        });
        // await this.userService.addPost(userId, post); // don't touch

        return post;
    }

    // *може бути на другій сторінці, *це фіча
    // async updatePost() {}

    // *є на другій сторінці, якщо на першій - то це фіча
    async removePost(postId: ObjectId): Promise<Post> {
        const postFind = await this.postModel.findById(postId);

        if(!postFind) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
        const string = postFind.image.split('/').pop();
        await this.fileService.deleteFile(string, TypeOperation.POSTS);
        const post = await this.postModel.findByIdAndRemove(postId).select({ createdAt: 0, updatedAt: 0 });

        // await this.userService.removePosts(post); // don't touch

        return post;
    }

    // postId, userId, body(text) 
    // async addComment(postId: ObjectId, ) {
    //     const comment = await this.postModel.findByIdAndUpdate()
    // }
}
