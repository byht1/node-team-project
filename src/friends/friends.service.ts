import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Friend, FriendDocument } from 'src/db-schema/friend.schema';

@Injectable()
export class FriendsService {
    constructor(@InjectModel(Friend.name) private friendModel: Model<FriendDocument>) {}
    
    async getAllFriends() {
        return await this.friendModel.find({"_id": {$ne: "63ed3f54220356e340b77d1f"}})
        // return await this.friendModel.find()
    }
}
