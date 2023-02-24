import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post, PostSchema } from 'src/db-schema/post.schema';
import { S3Service } from 'src/AWS/s3.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]), AuthModule, UserModule],
  controllers: [PostsController],
  providers: [PostsService, S3Service, UserService],
})
export class PostsModule {}
