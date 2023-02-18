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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiHeaders,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Notice } from 'src/db-schema/notice.schema';
import { ValidatePipe } from 'src/global/pipe/validate.pipe';
import { UploadedFilesDto } from './dto/uploaded-files.dto';

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
  getNoticesByCategoryAndSearch(@Query() dto: SearchDto) {
    console.log('getByCategoryAndSearch');
    return this.noticeService.getNoticesByCategoryAndSearch(dto);
  }

  @ApiOperation({ summary: 'Endpoint for receiving ads of an authorized user created by this user' })
  @ApiBearerAuth()
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'The token issued to the current user.',
    },
  ])
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
  @ApiBearerAuth()
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'The token issued to the current user.',
    },
  ])
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
    //
  }

  @ApiOperation({ summary: 'Endpoint for adding an ad to your favorites' })
  @ApiBearerAuth()
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'The token issued to the current user.',
    },
  ])
  @ApiResponse({ status: 200, type: mongoose.Schema.Types.ObjectId })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @ApiParam({ name: 'id', required: true, description: 'Ad identifier' })
  @UseGuards(JwtAuthGuard)
  @Patch('/:id/favorite')
  addNoticeToFavorite(@Req() request: IRequestUser, @Param('id') id: ObjectId) {
    console.log('addToFavorite');
    const { user } = request;
    return this.userService.addNoticeToFavorite(user._id, id);
  }

  @ApiOperation({ summary: 'Endpoint for adding an ad to your favorites' })
  @ApiBearerAuth()
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'The token issued to the current user.',
    },
  ])
  @ApiResponse({ status: 200, type: mongoose.Schema.Types.ObjectId })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @ApiParam({ name: 'id', required: true, description: 'Ad identifier' })
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
  @ApiParam({ name: 'id', required: true, description: 'Ad identifier' })
  @Get('/:id')
  getNoticeById(@Param('id') id: ObjectId) {
    console.log('getById');
    return this.noticeService.getNoticeById(id);
  }

  @ApiOperation({ summary: 'Endpoint for adding ads according to the selected category' })
  @ApiBearerAuth()
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'The token issued to the current user.',
    },
  ])
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateNoticeDto,
  })
  // @ApiBody({
  //   type: UploadedFilesDto,
  // })
  @ApiResponse({ status: 201, type: Notice })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidatePipe)
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 4 }]))
  addNotice(@Req() request: IRequestUser, @UploadedFiles() files: UploadedFilesDto, @Body() dto: CreateNoticeDto) {
    console.log('addNotice');
    const { user } = request;
    const { picture } = files;

    return this.noticeService.addNotice(user._id, dto, picture);
  }

  @ApiOperation({ summary: "Endpoint for deleting an authorized user's ad created by this user " })
  @ApiBearerAuth()
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'The token issued to the current user.',
    },
  ])
  @ApiResponse({ status: 200, type: Notice })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @ApiParam({ name: 'id', required: true, description: 'Ad identifier' })
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  removeNotice(@Param('id') id: ObjectId) {
    console.log('removeNotice');

    return this.noticeService.removeNotice(id);
  }
}
