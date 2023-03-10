import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NoticeModule } from './notice/notice.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NewsModule } from './news/news.module';
import { FriendsModule } from './friends/friends.module';
import { PetsModule } from './pets/pets.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRoot(process.env.DB_HOST),
    NoticeModule,
    AuthModule,
    UserModule,
    NewsModule,
    FriendsModule,
    PetsModule,
    PostsModule,
    CommentsModule,
  ],
})
export class AppModule {}
