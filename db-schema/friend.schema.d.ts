import mongoose, { Document } from 'mongoose';
interface IWorkDaySchedule {
    isOpen: boolean;
    from?: string;
    to?: string;
}
export type FriendDocument = Friend & Document;
export declare class Friend {
    _id: mongoose.Schema.Types.ObjectId;
    title: string;
    url: string;
    addressUrl: string;
    imageUrl: string;
    address: string;
    workDays: IWorkDaySchedule[];
    phone: string;
    email: string;
}
export declare const FriendSchema: mongoose.Schema<Friend, mongoose.Model<Friend, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Friend>;
export {};
