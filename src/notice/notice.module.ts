import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notice, NoticeSchema } from 'src/db-schema/notice.schema';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';
import { S3Service } from 'src/AWS/s3.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notice.name, schema: NoticeSchema }]),
  ],
  controllers: [NoticeController],
  providers: [NoticeService, S3Service],
})
export class NoticeModule {}
