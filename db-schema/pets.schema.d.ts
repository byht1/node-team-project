import mongoose, { Document } from "mongoose";
import { Users } from "./user.schema";
export type PetDocument = Pet & Document;
export declare class Pet {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    birth: string;
    breed: string;
    image: string;
    comments: string;
    owner: Users;
}
export declare const PetSchema: mongoose.Schema<Pet, mongoose.Model<Pet, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Pet>;
