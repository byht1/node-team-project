import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  Patch,
  Req,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import mongoose, { ObjectId } from 'mongoose';
import { NoticeService } from './notice.service';
import { UserService } from 'src/user/user.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { SearchDto } from './dto/search.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import { IRequestUser } from 'src/type/req';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Notice } from 'src/db-schema/notice.schema';
import { ValidatePipe } from 'src/global/pipe/validate.pipe';

@ApiTags('Notices')
@Controller('/notices')
export class NoticeController {
  constructor(private noticeService: NoticeService, private userService: UserService) {}

  @ApiOperation({ summary: 'Endpoint to receive ads by category' })
  @ApiResponse({ status: 200, type: [Notice] })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UsePipes(ValidatePipe)
  @Get()
  getNoticesByCategory(@Query() dto: SearchDto) {
    console.log('🚀 ~ file: notice.controller.ts:40 ~ NoticeController ~ getNoticesByCategory ~ dto', dto);
    console.log('getByCategory');
    return this.noticeService.getNoticesByCategory(dto);
  }

  @ApiOperation({ summary: 'Endpoint for receiving ads of an authorized user created by this user' })
  @ApiResponse({ status: 200, type: [Notice] })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Get('/user')
  getUserNotices(@Req() request: IRequestUser) {
    console.log('getUserNotices');
    const { user } = request;

    return this.noticeService.getUserNotices(user._id);
  }

  @ApiOperation({ summary: 'Endpoint for receiving ads of an authorized user who added them to favorites' })
  @ApiResponse({ status: 200, type: [Notice] })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Get('/favorite')
  getFavotiteNotices(@Req() request: IRequestUser) {
    console.log('favorite');
    const { user } = request;
    return this.userService.getFavotiteNotices(user._id);
  }

  @ApiOperation({ summary: 'Endpoint for adding an ad to your favorites' })
  @ApiResponse({ status: 200, type: mongoose.Schema.Types.ObjectId })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Patch('/:id/favorite')
  addNoticeToFavorite(@Req() request: IRequestUser, @Param('id') id: ObjectId) {
    console.log('addToFavorite');
    const { user } = request;
    return this.userService.addNoticeToFavorite(user._id, id);
  }

  @ApiOperation({ summary: 'Endpoint for adding an ad to your favorites' })
  @ApiResponse({ status: 200, type: mongoose.Schema.Types.ObjectId })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id/favorite')
  removeNoticeFromFavorite(@Req() request: IRequestUser, @Param('id') id: ObjectId) {
    console.log('removeFromFavorite');
    const { user } = request;
    return this.userService.removeNoticeFromFavorite(user._id, id);
  }

  @ApiOperation({ summary: 'Endpoint for receiving one ad' })
  @ApiResponse({ status: 200, type: Notice })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @Get('/:id')
  getNoticeById(@Param('id') id: ObjectId) {
    console.log('getById');
    return this.noticeService.getNoticeById(id);
  }

  @ApiOperation({ summary: 'Endpoint for adding ads according to the selected category' })
  @ApiResponse({ status: 201, type: Notice })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidatePipe)
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  addNotice(@Req() request: IRequestUser, @UploadedFiles() files, @Body() dto: CreateNoticeDto) {
    console.log('addNotice');
    const { user } = request;
    const { picture } = files;

    return this.noticeService.addNotice(user._id, dto, picture[0]);
  }

  @ApiOperation({ summary: "Endpoint for deleting an authorized user's ad created by this user " })
  @ApiResponse({ status: 200, type: Notice })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  removeNotice(@Param('id') id: ObjectId) {
    console.log('removeNotice');

    return this.noticeService.removeNotice(id);
  }
}
