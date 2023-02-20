import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryNotices } from 'src/global/enum/categoryNotices';

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
    required: false,
  })
  @Prop({ type: String, default: '' })
  name: string;

  @ApiProperty({
    example: "['https://api.multiavatar.com/User.png', ...]",
    required: false,
  })
  @Prop({ type: [String], default: ['https://api.multiavatar.com/User.png'] })
  imgUrl: string[];

  @ApiProperty({
    example: '01.01.2023',
    required: false,
  })
  @Prop({ type: String, default: '' })
  birthday: string;

  @ApiProperty({
    example: 'Dog',
    required: false,
  })
  @Prop({ type: String, default: '' })
  petType: string;

  @ApiProperty({
    example: 'Pomeranian',
    required: false,
  })
  @Prop({ type: String, default: '' })
  breed: string;

  @ApiProperty({
    example: 'Lviv',
    required: false,
  })
  @Prop({ type: String, default: '' })
  location: string;

  @ApiProperty({
    example: 'male',
    required: false,
  })
  @Prop({ type: String, enum: ['male', 'female'], default: '' })
  sex: string;

  @ApiProperty({
    example: '150',
  })
  @Prop({ type: String, required: [true, 'Price is required'] })
  price: string;

  @ApiProperty({
    example: 'in good hands',
  })
  @Prop({
    type: String,
    required: [true, 'Category is required'],
  })
  category: CategoryNotices;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur  Lorem ipsum dolor sit amet, consectetur Lorem',
  })
  @Prop({ type: String, required: [true, 'Price is required'] })
  comments: string;
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
