import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
// import * as mongoose from 'mongoose';

export type NoticeDocument = HydratedDocument<Notice>;

@Schema()
export class Notice {
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

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  // owner: User
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
