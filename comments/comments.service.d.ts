import { Model, ObjectId } from 'mongoose';
import { Comment, CommentDocument } from 'src/db-schema/comments.scheme';
import { PostsService } from 'src/posts/posts.service';
import { CreateCommentDto } from './dto';
export declare class CommentsService {
    private commentModel;
    private postService;
    constructor(commentModel: Model<CommentDocument>, postService: PostsService);
    createComment(createCommentDto: CreateCommentDto, postId: ObjectId, userId: ObjectId): Promise<Comment>;
    removeComment(commentId: ObjectId, postId: ObjectId): Promise<Comment>;
}
