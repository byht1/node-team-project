import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { Document } from "mongoose";
import { Post } from "./post.schema";
import { Users } from "./user.schema";

export type CommentDocument = Comment & Document;

@Schema({ versionKey: false, timestamps: true })
export class Comment {
    @ApiProperty({example: '63f139e997fc630d8da1ff68'})
    _id: mongoose.Schema.Types.ObjectId;

    @ApiProperty({ example: 'Post title' })
    @Prop({ required: [true, 'text is required'] })
    text: string;
    
    @ApiProperty({example: '63f37a8cbf6f72e7f1b27ba3'})
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
    author: Users;

    @ApiProperty({example: '63f37a8cbf6f72e7f1b27ba3'})
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
    post: Post;
}

export const CommentSchema = SchemaFactory.createForClass(Comment)