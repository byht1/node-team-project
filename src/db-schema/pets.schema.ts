import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';

export type PetDocument = Pet & Document;

@Schema()
export class Pet {
  @ApiProperty({ example: '63f139e997fc630d8da1ff68' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'Jack', description: 'Pet name' })
  @Prop({ required: [true, 'Name is required'] })
  name: string;

  @ApiProperty({ example: '22.04.2018' })
  @Prop()
  birth: string;

  @ApiProperty({ example: 'Persian cat' })
  @Prop({ required: [true, 'Breed is required'] })
  breed: string;

  @ApiProperty({ example: 'Image url' })
  @Prop()
  image: string;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur  Lorem ipsum dolor sit amet, consectetur Lorem',
  })
  @Prop({ required: [true, 'Comments are required'] })
  comments: string;

  // @ApiProperty({example: '63f139e997fc630d8da1ff68'})
  // @Prop({ required: true })
  // owner: string;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
