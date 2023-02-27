import { Model, ObjectId } from 'mongoose';
import { S3Service } from 'src/AWS/s3.service';
import { CommentDocument } from 'src/db-schema/comments.scheme';
import { Post, PostDocument } from 'src/db-schema/post.schema';
import { UserService } from 'src/user/user.service';
import { CreatePostDto, UploadeFileDto } from './dto';
import { SearchDto } from './dto/search.dto';
export declare class PostsService {
    private postModel;
    private fileService;
    private userService;
    constructor(postModel: Model<PostDocument>, fileService: S3Service, userService: UserService);
    getAllPosts(dto: SearchDto): Promise<Post[]>;
    getPostById(id: ObjectId): Promise<Post>;
    createPost(createPostDto: CreatePostDto, image: UploadeFileDto, userId: ObjectId): Promise<Post>;
    removePost(postId: ObjectId, userId: ObjectId): Promise<Post>;
    likes(postId: ObjectId, userId: ObjectId): Promise<Post>;
    addComment(postId: ObjectId, comment: CommentDocument): Promise<void>;
    removeComment(postId: ObjectId, comment: CommentDocument): Promise<void>;
}
