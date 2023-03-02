import mongoose, { Document } from "mongoose";
import { Post } from "./post.schema";
import { Users } from "./user.schema";
export type CommentDocument = Comment & Document;
export declare class Comment {
    _id: mongoose.Schema.Types.ObjectId;
    text: string;
    post: Post;
    author: Users;
}
export declare const CommentSchema: mongoose.Schema<Comment, mongoose.Model<Comment, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Comment>;
