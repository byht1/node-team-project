import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { CategoryNotices } from 'src/global/enum/categoryNotices';
export type NoticeDocument = HydratedDocument<Notice>;
export declare class Notice {
    _id: ObjectId;
    owner: ObjectId;
    category: CategoryNotices;
    title: string;
    name: string;
    birthday: string;
    petType: string;
    breed: string;
    sex: string;
    location: string;
    price: string;
    imgUrl: string[];
    comments: string;
}
export declare const NoticeSchema: mongoose.Schema<Notice, mongoose.Model<Notice, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Notice>;
