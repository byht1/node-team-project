import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { Friend, FriendSchema } from 'src/db-schema/friend.schema';

@Module({
  providers: [FriendsService],
  controllers: [FriendsController],
  imports: [
    MongooseModule.forFeature([
      { name: Friend.name, schema: FriendSchema }
    ])
  ],
})
export class FriendsModule {}
