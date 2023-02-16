import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from './user.schema';

export type NoticeDocument = HydratedDocument<Notice>;

@Schema()
export class Notice {
  @ApiProperty({ name: '_id', example: '6373c0bca5a6e4c9556f1e7a' })
  _id: ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  owner: Users;

  @Prop({
    type: String,
    required: [true, 'Title is required'],
  })
  title: string;

  @Prop()
  name: string;

  @Prop()
  imgUrl: string;

  @Prop()
  birthday: string;

  @Prop()
  bread: string;

  @Prop()
  place: string;

  @Prop({ type: String, enum: ['male', 'female'] })
  sex: string;

  @Prop()
  price: string;

  @Prop({
    type: String,
    required: [true, 'Category is required'],
    enum: ['sell', 'lost-found', 'for-free'],
  })
  category: string;

  @Prop()
  comments: string;
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
