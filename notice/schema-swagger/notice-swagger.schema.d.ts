import { CategoryNotices } from 'src/global/enum/categoryNotices';
export declare class NoticeSwagger {
    owner: {
        _id: string;
        email: string;
        phone: string;
    };
    title: string;
    name: string;
    imgUrl: string[];
    birthday: string;
    petType: string;
    breed: string;
    location: string;
    sex: string;
    price: string;
    category: CategoryNotices;
    comments: string;
}
