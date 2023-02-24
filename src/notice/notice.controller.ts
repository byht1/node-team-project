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
import { CreateNoticeSwaggerSchema } from './schema-swagger/create-notice-swagger.schema';
import { UploadedFilesDto } from './dto/uploaded-files.dto';
import { NoticeSwagger } from './schema-swagger/notice-swagger.schema';
import { ValidatePipe } from 'src/global/pipe/validate.pipe';
import { removeExtraSpaces } from 'src/helpers';

@ApiTags('Notices')
@Controller('/notices')
export class NoticeController {
  constructor(private noticeService: NoticeService, private userService: UserService) {}

  @ApiOperation({ summary: 'get notices grouped by category with a search by title' })
  @ApiResponse({ status: 200, type: [Notice] })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UsePipes(ValidatePipe)
  @Get()
  getNoticesByCategoryAndSearch(@Query() dto: SearchDto) {
    return this.noticeService.getNoticesByCategoryAndSearch(dto);
  }
  //==============================================
  @ApiOperation({ summary: 'receive notices that have been created by an authorized user' })
  @ApiBearerAuth()
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'User access token',
    },
  ])
  @ApiResponse({ status: 200, type: [Notice] })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Get('/user')
  getUserNotices(@Req() request: IRequestUser) {
    const { user } = request;

    return this.noticeService.getUserNotices(user._id);
  }
  //==============================================
  @ApiOperation({ summary: 'get favorite notices added by an authorized user' })
  @ApiBearerAuth()
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'User access token',
    },
  ])
  @ApiResponse({ status: 200, type: [Notice] })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Get('/favorite')
  getFavotiteNotices(@Req() request: IRequestUser) {
    const { user } = request;
    return this.userService.getFavotiteNotices(user._id);
    //
  }
  //==============================================
  @ApiOperation({ summary: 'add a notice to favorites by authorized user' })
  @ApiBearerAuth()
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'User access token',
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
    const { user } = request;
    return this.userService.addNoticeToFavorite(user._id, id);
  }
  //==============================================
  @ApiOperation({ summary: 'delete a notice from favorites by authorized user' })
  @ApiBearerAuth()
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'User access token',
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
    const { user } = request;
    return this.userService.removeNoticeFromFavorite(user._id, id);
  }

  @ApiOperation({ summary: 'get notice by id' })
  @ApiResponse({ status: 200, type: NoticeSwagger })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @ApiParam({ name: 'id', required: true, description: 'Ad identifier' })
  @Get('/:id')
  getNoticeById(@Param('id') id: ObjectId) {
    return this.noticeService.getNoticeById(id);
  }

  //==============================================
  @ApiOperation({ summary: 'add a notice to one of categories' })
  @ApiBearerAuth()
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'User access token.',
    },
  ])
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateNoticeSwaggerSchema })
  @ApiResponse({ status: 201, type: Notice })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidatePipe)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 4 }]))
  @Post()
  addNotice(@Req() request: IRequestUser, @UploadedFiles() files: UploadedFilesDto, @Body() dto: CreateNoticeDto) {
    const { user } = request;
    const { images } = files;
    const normalizedDto = removeExtraSpaces(dto) as CreateNoticeDto;

    return this.noticeService.addNotice(user._id, normalizedDto, images);
  }
  //==============================================
  @ApiOperation({ summary: 'delete a notice created by an authorized user' })
  @ApiBearerAuth()
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'User access token',
    },
  ])
  @ApiResponse({ status: 200, type: Notice })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @ApiParam({ name: 'id', required: true, description: 'Ad identifier' })
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  removeNotice(@Req() request: IRequestUser, @Param('id') id: ObjectId) {
    const { user } = request;
    return this.noticeService.removeNotice(user._id, id);
  }
}
