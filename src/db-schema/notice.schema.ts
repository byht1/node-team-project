import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type NoticeDocument = HydratedDocument<Notice>;

@Schema()
export class Notice {
  @ApiProperty({
    description: 'Identifier of the user who created the Notice',
    example: '63ee3d660f0d7d1060550d13',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  owner: ObjectId;

  @ApiProperty({
    example: 'Сute dog looking for a home',
  })
  @Prop({
    type: String,
    required: [true, 'Title is required'],
  })
  title: string;

  @ApiProperty({
    example: 'Rich',
  })
  @Prop({ type: String, default: '' })
  name: string;

  @ApiProperty({
    example: 'https://i.imgur.com/KcNVF45.jpg',
  })
  @Prop({ type: String, default: 'https://api.multiavatar.com/User.png' })
  imgUrl: string;

  @ApiProperty({
    example: '2020-08-31',
  })
  @Prop({ type: String, default: '' })
  birthday: string;

  @ApiProperty({
    example: 'Pomeranian',
  })
  @Prop({ type: String, default: '' })
  bread: string;

  @ApiProperty({
    example: 'Lviv',
  })
  @Prop({ type: String, default: '' })
  place: string;

  @ApiProperty({
    example: 'male',
  })
  @Prop({ type: String, enum: ['male', 'female'], default: '' })
  sex: string;

  @ApiProperty({
    example: '150uah',
  })
  @Prop({ type: String, default: '' })
  price: string;

  @ApiProperty({
    example: 'for-free',
  })
  @Prop({
    type: String,
    required: [true, 'Category is required'],
    enum: ['sell', 'lost-found', 'for-free'],
  })
  category: string;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur  Lorem ipsum dolor sit amet, consectetur Lorem',
  })
  @Prop({ type: String, default: '' })
  comments: string;

  @ApiProperty({ example: '+380999996633' })
  @Prop({ type: String, default: '' })
  phone: string;

  @ApiProperty({ example: 'owner@mail.com' })
  @Prop({ type: String, default: '' })
  email: string;
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
