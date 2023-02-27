import mongoose, { Document } from 'mongoose';
export type NewDocument = New & Document;
export declare class New {
    _id: mongoose.Schema.Types.ObjectId;
    title: string;
    url: string;
    description: string;
    date: string;
}
export declare const NewSchema: mongoose.Schema<New, mongoose.Model<New, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, New>;
