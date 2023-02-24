import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notice, NoticeSchema } from 'src/db-schema/notice.schema';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';
import { UserService } from 'src/user/user.service';
import { S3Service } from 'src/AWS/s3.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Notice.name, schema: NoticeSchema }]), AuthModule, UserModule],
  controllers: [NoticeController],
  providers: [NoticeService, S3Service, UserService],
})
export class NoticeModule {}
