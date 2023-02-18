import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type PetDocument = Pet & Document;

@Schema()
export class Pet {
    _id: mongoose.Schema.Types.ObjectId;

    @Prop({ required: [true, 'name is required'] })
    name: string;

    @Prop()
    birth: string;

    @Prop({ required: [true, 'breed is required'] })
    breed: string;

    @Prop({ required: [true, 'photo is required'] })
    image: string;

    @Prop({ required: [true, 'comments are required'] })
    comments: string;
    
    // @Prop({ required: true })
    // owner: string;
}

export const PetSchema = SchemaFactory.createForClass(Pet)