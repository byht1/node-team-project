import { Model, ObjectId } from 'mongoose';
import { Comment, CommentDocument } from 'src/db-schema/comments.schema';
import { PostsService } from 'src/posts/posts.service';
import { UserService } from 'src/user/user.service';
import { CreateCommentDto } from './dto';
export declare class CommentsService {
    private commentModel;
    private postService;
    private userService;
    constructor(commentModel: Model<CommentDocument>, postService: PostsService, userService: UserService);
    createComment(createCommentDto: CreateCommentDto, postId: ObjectId, userId: ObjectId): Promise<Comment>;
    removeComment(commentId: ObjectId, postId: ObjectId, userId: ObjectId): Promise<Comment>;
    removeAllPostComments(postId: ObjectId): Promise<void>;
}
