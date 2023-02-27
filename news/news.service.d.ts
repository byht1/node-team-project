import { Model } from 'mongoose';
import { New, NewDocument } from 'src/db-schema/new.schema';
export declare class NewsService {
    private newModel;
    constructor(newModel: Model<NewDocument>);
    getAllNews(): Promise<New[]>;
}
