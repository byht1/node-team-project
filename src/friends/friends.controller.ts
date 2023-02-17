import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Friend } from 'src/db-schema/friend.schema';
import { FriendsService } from './friends.service';

@ApiTags('Services-Sidebar')
@Controller('friends')
export class FriendsController {
    constructor(private readonly friendsService: FriendsService) {}

    @ApiOperation({summary: 'Get all friends'})
    @ApiResponse({status: 200, type: [Friend]})
    @Get()
    getAll(): Promise<Friend[]> {
        return this.friendsService.getAllFriends() 
    }
}
