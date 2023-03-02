import { ObjectId } from 'mongoose';
import { PostsService } from './posts.service';
import { CreateCommentDto, CreatePostDto, SearchDto, UploadeFileDto } from './dto';
import { IRequestUser } from 'src/type/req';
import { Post as PostDBSchema } from 'src/db-schema/post.schema';
import { Comment as CommentDBSchema } from 'src/db-schema/comments.schema';
import { CommentsService } from 'src/comments/comments.service';
export declare class PostsController {
    private readonly postsService;
    private readonly commentsService;
    constructor(postsService: PostsService, commentsService: CommentsService);
    getAllPosts(dto: SearchDto): Promise<PostDBSchema[]>;
    getOnePost(id: ObjectId): Promise<PostDBSchema>;
    createPost(req: IRequestUser, dto: CreatePostDto, { image }: UploadeFileDto): Promise<PostDBSchema>;
    removePost(postId: ObjectId, req: IRequestUser): Promise<PostDBSchema>;
    likes(id: ObjectId, req: IRequestUser): Promise<PostDBSchema>;
    addComment(postId: ObjectId, req: IRequestUser, dto: CreateCommentDto): Promise<CommentDBSchema>;
    removeComment(postId: ObjectId, req: IRequestUser, commentId: ObjectId): Promise<CommentDBSchema>;
}
