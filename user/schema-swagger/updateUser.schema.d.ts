import { ObjectId } from 'mongoose';
export declare class UpdateUser {
    _id: ObjectId;
    email: string;
    name: string;
    phone: string;
    forgottenPasswordToken: string;
    verificationToken: string;
    verify: boolean;
    photo: string;
    favorite: ObjectId[];
    advertisement: ObjectId[];
    cards: ObjectId[];
    forgottenPassword: string;
    birthday: string;
}
