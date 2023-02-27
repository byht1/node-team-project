import { Model } from 'mongoose';
import { Friend, FriendDocument } from 'src/db-schema/friend.schema';
export declare class FriendsService {
    private friendModel;
    constructor(friendModel: Model<FriendDocument>);
    getAllFriends(): Promise<Friend[]>;
}
