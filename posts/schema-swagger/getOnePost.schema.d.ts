import mongoose from "mongoose";
import { Comment } from "../../db-schema/comments.schema";
export declare class GetOnePostSchema {
    _id: mongoose.Schema.Types.ObjectId;
    title: string;
    text: string;
    category: string;
    image: string;
    likes: mongoose.Schema.Types.ObjectId[];
    author: {
        _id: '63f139e997fc630d8da1ff68';
        name: 'Post author name';
        photo: 'https://api.multiavatar.com/author.png';
    };
    comments: Comment[];
}
