import { CategoryNotices } from '../../global/enum/categoryNotices';
export declare class SearchDto {
    readonly category?: CategoryNotices;
    readonly search?: string;
    readonly count?: number;
    readonly offset?: number;
}
