import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post, PostSchema } from 'src/db-schema/post.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { S3Service } from 'src/AWS/s3.service';

@Module({
  // imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]), AuthModule, UserModule],
  imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])],
  controllers: [PostsController],
  providers: [PostsService, S3Service],
})
export class PostsModule {}
