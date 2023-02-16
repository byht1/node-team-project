import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Friend, FriendSchema } from 'src/db-schema/friend.schema';
import { S3Module } from 'src/AWS/s3.module';

@Module({
  providers: [FriendsService],
  controllers: [FriendsController],
  imports: [
    MongooseModule.forFeature([
      {name: Friend.name, schema: FriendSchema}
    ]),
    S3Module,
  ],
})
export class FriendsModule {}
