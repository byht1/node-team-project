import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type NoticeDocument = HydratedDocument<Notice>;

@Schema()
export class Notice {
  // @ApiProperty({ description: 'Unique identifier', example: '63ee3d660f0d7d1060550d13' })
  // @Prop({ type: mongoose.Schema.Types.ObjectId })
  // _id: ObjectId;

  @ApiProperty({
    description: 'Unique identifier of the user who created the Notice',
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
    example: {
      jpg: 'https://i.imgur.com/KcNVF45.jpg',
      png: 'https://i.imgur.com/KcNVF45.png',
    },
  })
  @Prop({ type: String, default: '' })
  imgUrl: string;

  @ApiProperty({
    example: '21.09.2020',
  })
  @Prop({ type: String, default: '' })
  birthday: string;
  default: '00.00.0000';

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
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
