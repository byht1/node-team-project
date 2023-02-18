import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { S3Service, TypeOperation } from 'src/AWS/s3.service';
import { Notice, NoticeDocument } from 'src/db-schema/notice.schema';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { SearchDto } from './dto/search.dto';

@Injectable()
export class NoticeService {
  constructor(@InjectModel(Notice.name) private noticeModel: Model<NoticeDocument>, private s3Service: S3Service) {}

  async getNoticesByCategoryAndSearch(dto: SearchDto, count = 10, offset = 0): Promise<Notice[]> {
    const notices = await this.noticeModel
      .find({
        category: dto.category,
        title: { $regex: new RegExp(dto.search, 'i') },
      })
      .skip(Number(offset))
      .limit(Number(count));
    return notices;
  }

  async getNoticeById(id: ObjectId): Promise<Notice> {
    const notice = await this.noticeModel.findById(id);

    if (!notice) {
      throw new HttpException('Ad not found', HttpStatus.NOT_FOUND);
    }
    return notice;
  }

  async addNotice(userId: ObjectId, dto: CreateNoticeDto, picture: string[]): Promise<Notice> {
    console.log('addNotice-service');

    const picturePath = await Promise.all(picture.map(pic => this.s3Service.uploadFile(pic, TypeOperation.IMAGE)));

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

    if (!notice) {
      throw new HttpException('Оголошення не знайдено', HttpStatus.NOT_FOUND);
    }

    return notice;
  }
}
