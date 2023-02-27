import { ObjectId } from 'mongoose';
export declare class UserDataPets {
    _id: ObjectId;
    email: string;
    name: string;
    phone: string;
    verify: boolean;
    photo: string;
    cards: {
        _id: '63f139e997fc630d8da1ff68';
        name: 'Jack';
        birth: '22.04.2018';
        breed: 'Persian cat';
        image: 'https://api.multiavatar.com/pet.png';
        comments: 'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem';
        owner: '63f37a8cbf6f72e7f1b27ba3';
    }[];
    birthday: string;
}
