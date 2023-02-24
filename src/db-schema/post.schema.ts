import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { Document } from "mongoose";
import { Users } from "./user.schema";

export type PostDocument = Post & Document;

@Schema({ versionKey: false, timestamps: true })
export class Post {
    @ApiProperty({example: '63f139e997fc630d8da1ff68'})
    _id: mongoose.Schema.Types.ObjectId;

    @ApiProperty({ example: 'Post title' })
    @Prop({ required: [true, 'title is required'] })
    title: string;

    @ApiProperty({ example: 'Post text' })
    @Prop({ required: [true, 'text is required'] })
    text: string;

    @ApiProperty({example: 'veterinary'})
    @Prop({ required: [true, 'category is required'] })
    category: string;

    @ApiProperty({ example: 'https://api.multiavatar.com/post.png' })
    @Prop()
    image: string;

    @ApiProperty({ example: ['63f139e997fc630d8da1ff68'] })
    @Prop()
    likes: mongoose.Schema.Types.ObjectId[];

    @ApiProperty({example: '63f139e997fc630d8da1ff68'})
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users'})
    author: Users;

    @ApiProperty({ example: ['6373c0bca5a6e4c9556f1e7a'] })
    @Prop()
    comments: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post)