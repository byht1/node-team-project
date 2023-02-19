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
  access_token: Token[];

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiI.eyJpZCI6IjYLCJpYXQiOjE2NjU2NTM2NgsImV4cCI6MTY2NTc0MDA3OH0.mZMKEw1j3N9VVZ97E',
  })
  @Prop()
  refresh_token: Token[];

  @ApiProperty({ example: 'test@gmail.com' })
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty({ example: '+380964752260' })
  @Prop({ type: String, default: '' })
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
    example: 'https://api.multiavatar.com/1.png',
  })
  @Prop({
    type: String,
    default: 'https://api.multiavatar.com/1.png',
  })
  photo: string;

  @ApiProperty({ example: ['6373c0bca5a6e4c9556f1e7a'] })
  @Prop({
    // FIXME: задати нормальний ref
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

  @ApiProperty({
    example: '20.08.1999',
  })
  @Prop({ type: String, default: '00.00.0000' })
  birthday: string;

  @ApiProperty({
    example: 'Kyiv',
  })
  @Prop({ type: String, default: '' })
  city: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
