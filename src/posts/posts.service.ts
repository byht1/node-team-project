import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { S3Service, TypeOperation } from 'src/AWS/s3.service';
import { CommentDocument } from 'src/db-schema/comments.schema';
import { Post, PostDocument } from 'src/db-schema/post.schema';
import { UserService } from 'src/user/user.service';
import { CreatePostDto, UploadeFileDto } from './dto';
import { SearchDto } from './dto/search.dto';
import { TId } from 'src/type';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<PostDocument>,
        private fileService: S3Service,
        private userService: UserService,
    ) {}

    async getAllPosts(dto: SearchDto): Promise<Post[]> {
        const { count = 3, offset = 0 } = dto;

        const posts = await this.postModel.find({title: { $regex: new RegExp(dto.searchQuery, 'i') }})
        .skip(offset)
        .limit(count)
        .sort({'createdAt': -1})
        .populate('author', {name: 1})
        
        return posts;
    }

    async getPostById(id: ObjectId): Promise<Post> {
        const post = await this.postModel.findById(id)
        .populate('author', {name: 1, photo: 1})
        .populate({
            path: 'comments',
            populate: {
                path: 'author', select: 'name photo',
            }
        });

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
            author: userId,
        });
        
        await this.userService.addPost(userId, post);

        return post;
    }

    async removePost(postId: ObjectId, userId: ObjectId): Promise<Post> {
        const post = await this.postModel.findOneAndRemove({ author: {_id: userId}, _id: postId}).select({ createdAt: 0, updatedAt: 0 });

        if(!post) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
        const string = post.image.split('/').pop();

        const deleteFilePromise = this.fileService.deleteFile(string, TypeOperation.POSTS);
        const userPostPromise = this.userService.removePost(userId, post._id);

        await Promise.all([deleteFilePromise, userPostPromise])

        return post;
    }

    async likes(postId: ObjectId, userId: ObjectId): Promise<Post> {
        const post = await this.postModel.findById(postId);

        if (post.likes.includes(userId)) {
            const userIdToString = userId.toString();
            post.likes = post.likes.filter(id => id.toString() !== userIdToString);
        } else {
            post.likes.push(userId);
        }
        
        await post.save();

        return post;
    }

    async addCommentToPost(postId: ObjectId, comment: CommentDocument) {
        console.log(1, postId)
        const post = await this.postModel.findById(postId);

        if(!post) {
            console.log(2, post)
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND); 
        }

        post.comments.push(comment._id);
        await post.save();

        return;
    }

    async removeCommentFromPost(postId: TId, commentId: ObjectId) {
        await this.postModel.findByIdAndUpdate(postId, {
            $pull: { comments: commentId },
        });


        return;
    }
}
