import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { ObjectId } from 'mongoose';
import { Token } from '../auth/type';

export type UsersDocument = Users & Document;

@Schema({ versionKey: false, timestamps: true })
export class Users {
  @ApiProperty({ name: '_id', example: '6373c0bca5a6e4c9556f1e7a' })
  _id: ObjectId;

  @ApiProperty({ example: 'test@gmail.com' })
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiI.eyJpZCI6IjYLCJpYXQiOjE2NjU2NTM2NgsImV4cCI6MTY2NTc0MDA3OH0.mZMKEw1j3N9VVZ97E',
  })
  @Prop()
  asses_token: Token[];

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiI.eyJpZCI6IjYLCJpYXQiOjE2NjU2NTM2NgsImV4cCI6MTY2NTc0MDA3OH0.mZMKEw1j3N9VVZ97E',
  })
  @Prop()
  refresh_token: Token[];

  @ApiProperty({ example: 'test@gmail.com' })
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty({ example: 'test@gmail.com' })
  @Prop({ type: String, required: true })
  phone: string;

  @ApiProperty({
    example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
  })
  @Prop({ type: String, default: null })
  forgottenPasswordToken: string;

  @ApiProperty({
    example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
  })
  @Prop({ type: String, default: null })
  verificationToken: string;

  @ApiProperty({
    example: false,
  })
  @Prop({ type: Boolean, default: false })
  verify: boolean;

  @ApiProperty({
    example: {
      svg: 'https://api.multiavatar.com/1.svg',
      png: 'https://api.multiavatar.com/1.png',
    },
  })
  @Prop({
    type: { svg: String, png: String },
    default: {
      svg: 'https://api.multiavatar.com/1.svg',
      png: 'https://api.multiavatar.com/1.png',
    },
  })
  photo: string;

  @ApiProperty({ example: ['6373c0bca5a6e4c9556f1e7a'] })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notice' }],
    default: [],
  })
  favorite: ObjectId[];

  @ApiProperty({ example: ['6373c0bca5a6e4c9556f1e7a'] })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notice' }],
    default: [],
  })
  advertisement: ObjectId[];

  @ApiProperty({ example: ['6373c0bca5a6e4c9556f1e7a'] })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notice' }],
    default: [],
  })
  cards: ObjectId[];

  @ApiProperty({
    example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
  })
  @Prop({ type: String, default: null })
  forgottenPassword: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
