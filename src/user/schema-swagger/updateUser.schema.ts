import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class UpdateUser {
  @ApiProperty({ name: '_id', example: '6373c0bca5a6e4c9556f1e7a' })
  _id: ObjectId;

  @ApiProperty({ example: 'test@gmail.com' })
  email: string;

  @ApiProperty({ example: 'test@gmail.com' })
  name: string;

  @ApiProperty({ example: 'test@gmail.com' })
  phone: string;

  @ApiProperty({
    example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
  })
  forgottenPasswordToken: string;

  @ApiProperty({
    example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
  })
  verificationToken: string;

  @ApiProperty({
    example: false,
  })
  verify: boolean;

  @ApiProperty({
    example: 'https://api.multiavatar.com/1.png',
  })
  photo: string;

  @ApiProperty({ example: ['6373c0bca5a6e4c9556f1e7a'] })
  favorite: ObjectId[];

  @ApiProperty({ example: ['6373c0bca5a6e4c9556f1e7a'] })
  advertisement: ObjectId[];

  @ApiProperty({ example: ['6373c0bca5a6e4c9556f1e7a'] })
  cards: ObjectId[];

  @ApiProperty({
    example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
  })
  forgottenPassword: string;

  @ApiProperty({
    example: '20.08.1999',
  })
  birthday: string;
}
