import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { S3Service, TypeOperation } from 'src/AWS/s3.service';
import { Notice, NoticeDocument } from 'src/db-schema/notice.schema';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { SearchDto } from './dto/search.dto';
import { Users, UsersDocument } from 'src/db-schema/user.schema';

@Injectable()
export class NoticeService {
  constructor(
    @InjectModel(Notice.name) private noticeModel: Model<NoticeDocument>,
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
    private s3Service: S3Service,
  ) {}

  async getNoticesByCategory(dto: SearchDto): Promise<Notice[]> {
    const notices = await this.noticeModel.find(dto);
    return notices;
  }

  async getNoticeById(id: ObjectId): Promise<Notice> {
    const notice = await this.noticeModel.findById(id);

    if (!notice) {
      throw new HttpException('Оголошення не знайдено', HttpStatus.NOT_FOUND);
    }
    return notice;
  }

  async addNotice(userId: ObjectId, dto: CreateNoticeDto, picture: string): Promise<Notice> {
    const picturePath = await this.s3Service.uploadFile(picture, TypeOperation.IMAGE);

    const notice = await this.noticeModel.create({
      ...dto,
      owner: userId,
      imgUrl: picturePath,
    });

    return notice;
  }

  async getUserNotices(userId: ObjectId): Promise<Notice[]> {
    const notices = this.noticeModel.find({ owner: userId });

    return notices;
  }

  async removeNotice(noticeId: ObjectId): Promise<Notice> {
    const notice = await this.noticeModel.findByIdAndRemove(noticeId);

    return notice;
  }
}
