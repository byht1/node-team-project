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
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { Request } from 'express';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { SearchDto } from './dto/search.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('/notices')
export class NoticeController {
  constructor(private noticeService: NoticeService) {}

  @Get()
  getNoticesByCategory(@Query() dto: SearchDto) {
    console.log('getByCategory');
    return this.noticeService.getNoticesByCategory(dto);
  }

  @Get('/favorite')
  getFavotiteNotices(@Req() request: Request) {
    console.log('getFavotite');
    // console.log(request);
    return this.noticeService.getFavotiteNotices();
  }

  @Get('/:id')
  getNoticeById(@Param('id') id: ObjectId) {
    console.log('getById');
    return this.noticeService.getNoticeById(id);
  }

  @Patch('/:id/favorite')
  addNoticeToFavorite(@Req() request: Request, @Param('id') id: ObjectId) {
    console.log('addToFavorite');
    // console.log(request);
    return this.noticeService.addNoticeToFavorite(id);
  }

  @Delete(':id/favorite')
  removeNoticeFromFavorite(@Req() request: Request, @Param('id') id: ObjectId) {
    console.log('removeFromFavorite');
    // console.log(request);
    return this.noticeService.removeNoticeFromFavorite(id);
  }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  addNotice(@UploadedFiles() files, @Body() dto: CreateNoticeDto) {
    const { picture } = files;
    return this.noticeService.addNotice(dto, picture[0]);
  }

  getUser;
}
