import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { Document } from "mongoose";
import { Users } from "./user.schema";

export type PetDocument = Pet & Document;

@Schema({ versionKey: false, timestamps: true })
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

    @ApiProperty({example: 'https://api.multiavatar.com/pet.png'})
    @Prop()
    image: string;

    @ApiProperty({example: 'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem'})
    @Prop({ required: [true, 'comments are required'] })
    comments: string;
    
    @ApiProperty({example: '63f37a8cbf6f72e7f1b27ba3'})
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
    owner: Users;
}

export const PetSchema = SchemaFactory.createForClass(Pet)