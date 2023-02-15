import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { New } from 'src/db-schema/new.schema';
import { NewsService } from './news.service'

@ApiTags('News')
@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @ApiOperation({summary: 'Get all news'})
    @ApiResponse({status: 200, type: [New]})
    @Get()
    getAll(): Promise<New[]>{
        return this.newsService.getAllNews()
    }
}
