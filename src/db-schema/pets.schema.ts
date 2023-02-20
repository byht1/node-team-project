import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { Document } from "mongoose";

export type PetDocument = Pet & Document;

@Schema({versionKey: false})
export class Pet {
    @ApiProperty({example: '63f139e997fc630d8da1ff68'})
    _id: mongoose.Schema.Types.ObjectId;

    @ApiProperty({ example: 'Jack' })
    @Prop({ required: [true, 'name is required'] })
    name: string;

    @ApiProperty({example: '22.04.2018'})
    @Prop()
    birth: string;
    
    @ApiProperty({example: 'Persian cat'})
    @Prop({ required: [true, 'breed is required'] })
    breed: string;

    @ApiProperty({example: 'https://team-project-react-node.s3.amazonaws.com/pets/99524fa4-dcf7-40db-9b59-a3a8a5e1efd1.jpg'})
    @Prop()
    image: string;

    @ApiProperty({example: 'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem'})
    @Prop({ required: [true, 'comments are required'] })
    comments: string;
    
    // @ApiProperty({example: '63f139e997fc630d8da1ff68'})
    // @Prop({ required: true })
    // owner: string;
}

export const PetSchema = SchemaFactory.createForClass(Pet)