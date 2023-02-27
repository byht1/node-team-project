import { Friend } from 'src/db-schema/friend.schema';
import { FriendsService } from './friends.service';
export declare class FriendsController {
    private readonly friendsService;
    constructor(friendsService: FriendsService);
    getAll(): Promise<Friend[]>;
}
