import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { S3Service, TypeOperation } from 'src/AWS/s3.service';
import { Notice, NoticeDocument } from 'src/db-schema/notice.schema';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { SearchDto } from './dto/search.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class NoticeService {
  constructor(
    @InjectModel(Notice.name) private noticeModel: Model<NoticeDocument>,
    private s3Service: S3Service,
    private userService: UserService,
  ) {}

  async getNoticesByCategoryAndSearch(dto: SearchDto): Promise<Notice[]> {
    const { count = 10, offset = 0, category = 'sell', search = '' } = dto;

    const notices = await this.noticeModel
      .find({
        category,
        title: { $regex: new RegExp(search, 'i') },
      })
      .skip(Number(offset) * count)
      .limit(Number(count))
      .sort({ createdAt: -1 });

    return notices;
  }

  async getNoticeById(id: ObjectId): Promise<Notice> {
    const notice = await this.noticeModel.findById(id).populate({ path: 'owner', select: ['email', 'phone'] });

    if (!notice) {
      throw new HttpException('Ad not found', HttpStatus.NOT_FOUND);
    }
    return notice;
  }

  async addNotice(userId: ObjectId, dto: CreateNoticeDto, picture: string[]): Promise<Notice> {
    let picturePath = [];

    if (picture) {
      picturePath = await Promise.all(picture.map(pic => this.s3Service.uploadFile(pic, TypeOperation.IMAGE)));
    }

    const notice = await this.noticeModel.create({
      ...dto,
      owner: userId,
      imgUrl: picturePath,
    });

    await this.userService.addNotice(userId, notice);

    return notice;
  }

  async getUserNotices(userId: ObjectId): Promise<Notice[]> {
    const notices = this.noticeModel.find({ owner: userId });

    return notices;
  }

  async removeNotice(userId: ObjectId, noticeId: ObjectId): Promise<Notice> {
    const notice = await this.noticeModel.findOneAndRemove({ owner: userId, _id: noticeId });

    if (!notice) {
      throw new HttpException("The notice wasn't found or doesn't belong to the authorized user", HttpStatus.NOT_FOUND);
    }

    const picturePath = notice.imgUrl;

    if (picturePath.length > 0) {
      Promise.all(picturePath.map(el => this.s3Service.deleteFile(el, TypeOperation.IMAGE)));
    }

    await this.userService.removeNotise(userId, notice._id);

    return notice;
  }
}
