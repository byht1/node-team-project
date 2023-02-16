import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { S3Service, TypeOperation } from 'src/AWS/s3.service';
import { Friend, FriendDocument } from 'src/db-schema/friend.schema';
import { UpdateFriendDto } from './dto/update-fr.dto';

@Injectable()
export class FriendsService {
    constructor(@InjectModel(Friend.name) private friendModel: Model<FriendDocument>,
    private fileservice: S3Service) {}
    
    async getAllFriends() {
        return await this.friendModel.find({"_id": {$ne: "63ed3f54220356e340b77d1f"}})
        // return await this.friendModel.find()
    }

    async updateFriend(id: string, dto: UpdateFriendDto): Promise<Friend> {
        const filename = await this.fileservice.uploadFile(dto, TypeOperation.FRIENDS)
        console.log("filename: ", filename)
        const updatedFriend = await this.friendModel.findByIdAndUpdate(id, {imageUrl: filename}, {new: true})
        return updatedFriend
    }
}
