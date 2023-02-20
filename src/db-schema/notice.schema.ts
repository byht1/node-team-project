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
    example: 'in good hands',
  })
  @Prop({
    type: String,
    required: [true, 'Category is required'],
  })
  category: CategoryNotices;

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
    example: 'male',
  })
  @Prop({ type: String, enum: ['male', 'female'], default: 'male', required: [true, 'Sex is required'] })
  sex: string;

  @ApiProperty({
    example: 'Lviv',
  })
  @Prop({ type: String, default: '', required: [true, 'Location is required'] })
  location: string;

  @ApiProperty({
    description: 'If category is "sell" price is required',
    example: '150',
    required: false,
  })
  @Prop({
    type: String,
  })
  price: string;

  @ApiProperty({
    example: "['https://team-project-react-node.s3.amazonaws.com/image/bee726b9-45b2-4a31-b616-4cee1c640209.jpg', ...]",
    required: false,
  })
  @Prop({
    type: [String],
    default: ['https://team-project-react-node.s3.amazonaws.com/image/bee726b9-45b2-4a31-b616-4cee1c640209.jpg'],
  })
  imgUrl: string[];

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur  Lorem ipsum dolor sit amet, consectetur Lorem',
    required: false,
  })
  @Prop({
    type: String,
  })
  comments: string;
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
