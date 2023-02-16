import { Body, Controller, Get, Param, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Friend } from 'src/db-schema/friend.schema';
// import { UpdateFriendDto } from './dto/update-fr.dto';
import { FriendsService } from './friends.service';

@ApiTags('Friends')
@Controller('friends')
export class FriendsController {
    constructor(private readonly friendsService: FriendsService) {}

    @ApiOperation({summary: 'Get all friends'})
    @ApiResponse({status: 200, type: [Friend]})
    @Get()
    getAll() {
        return this.friendsService.getAllFriends() 
    }

    @Put(':id/image')
    @UseInterceptors(FileInterceptor('image'))
    updateImage(@Param('id') id: string, 
    @UploadedFile() image): Promise<Friend> {
        return this.friendsService.updateFriend(id, image)
    }
}
