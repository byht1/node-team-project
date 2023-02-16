import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { New, NewSchema } from 'src/db-schema/new.schema';

@Module({
  providers: [NewsService],
  controllers: [NewsController],
  imports: [MongooseModule.forFeature([{ name: New.name, schema: NewSchema }])],
})
export class NewsModule {}
