import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Comment, CommentDocument } from 'src/db-schema/comments.schema';
import { PostsService } from 'src/posts/posts.service';
import { UserService } from 'src/user/user.service';
import { CreateCommentDto } from './dto';

@Injectable()
export class CommentsService {
    constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private postService: PostsService,
    private userService: UserService) {}

    async createComment(createCommentDto: CreateCommentDto, postId: ObjectId, userId: ObjectId): Promise<Comment> {
        const comment = await this.commentModel.create({
            ...createCommentDto,
            author: userId,
            post: postId,
        });

        await this.postService.addCommentToPost(postId, comment);
        await this.userService.addComment(userId, comment);

        return comment;
    }

    async removeComment(commentId: ObjectId, postId: ObjectId, userId: ObjectId): Promise<Comment> {
        const commentFind = await this.commentModel.findOne({ owner: userId, _id: commentId });

        if(!commentFind) {
            throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
        }
        const comment = await this.commentModel.findByIdAndRemove(commentId).select({ createdAt: 0, updatedAt: 0 });

        await this.postService.removeCommentFromPost(postId, comment);
        await this.userService.removeComment(userId, comment);

        return comment;
    }

    async removeAllPostComments(postId: ObjectId) {
        await this.commentModel.deleteMany({post: postId});
        return;
    }
}
