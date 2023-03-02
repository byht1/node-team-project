import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Comment, CommentSchema } from 'src/db-schema/comments.schema';
import { PostsModule } from 'src/posts/posts.module';
import { UserModule } from 'src/user/user.module';
import { CommentsService } from './comments.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]), AuthModule, UserModule, forwardRef(() => PostsModule)],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
