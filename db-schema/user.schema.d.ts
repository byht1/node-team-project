import mongoose, { ObjectId } from 'mongoose';
import { Token } from '../auth/type';
import { Pet } from './pets.schema';
import { Post } from './post.schema';
export type UsersDocument = Users & Document;
export declare class Users {
    _id: ObjectId;
    email: string;
    password: string;
    access_token: Token[];
    refresh_token: Token[];
    name: string;
    phone: string;
    forgottenPasswordToken: string;
    verificationToken: string;
    verify: boolean;
    photo: string;
    favorite: ObjectId[];
    advertisement: ObjectId[];
    cards: Pet[];
    posts: Post[];
    forgottenPassword: string;
    birthday: string;
    city: string;
}
export declare const UsersSchema: mongoose.Schema<Users, mongoose.Model<Users, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Users>;
