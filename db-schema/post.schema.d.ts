import mongoose, { Document } from "mongoose";
import { Comment } from "./comments.schema";
import { Users } from "./user.schema";
export type PostDocument = Post & Document;
export declare class Post {
    _id: mongoose.Schema.Types.ObjectId;
    title: string;
    text: string;
    category: string;
    image: string;
    likes: mongoose.Schema.Types.ObjectId[];
    author: Users;
    comments: Comment[];
}
export declare const PostSchema: mongoose.Schema<Post, mongoose.Model<Post, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Post>;
