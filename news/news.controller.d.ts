import { New } from 'src/db-schema/new.schema';
import { NewsService } from './news.service';
export declare class NewsController {
    private readonly newsService;
    constructor(newsService: NewsService);
    getAll(): Promise<New[]>;
}
