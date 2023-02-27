import { CategoryNotices } from 'src/global/enum/categoryNotices';
export declare class CreateNoticeSwaggerSchema {
    readonly title: string;
    readonly petType: string;
    readonly name: string;
    readonly birthday: string;
    readonly breed: string;
    readonly location: string;
    readonly sex: string;
    readonly price: string;
    readonly category: CategoryNotices;
    readonly comments: string;
    readonly images: string[];
}
