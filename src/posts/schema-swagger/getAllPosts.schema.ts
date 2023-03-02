import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";
import { Comment } from "../../db-schema/comments.schema";

export class GetAllPostsSchema {
    @ApiProperty({example: '63f139e997fc630d8da1ff68'})
    _id: mongoose.Schema.Types.ObjectId;

    @ApiProperty({ example: 'Post title' })
    title: string;

    @ApiProperty({ example: 'Post text' })
    text: string;

    @ApiProperty({example: 'veterinary'})
    category: string;

    @ApiProperty({ example: 'https://api.multiavatar.com/post.png' })
    image: string;

    @ApiProperty({ example: ['63f139e997fc630d8da1ff68'] })
    likes: mongoose.Schema.Types.ObjectId[];

    @ApiProperty({example: {
        _id: '63f139e997fc630d8da1ff68',
        name: 'James Allen'
    }})
    author: {
        _id: '63f139e997fc630d8da1ff68',
        name: 'Post author name'
    };

    @ApiProperty({ example: ['6373c0bca5a6e4c9556f1e7a'] })
    comments: Comment[];
}