import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { S3Service, TypeOperation } from 'src/AWS/s3.service';
import { Notice, NoticeDocument } from 'src/db-schema/notice.schema';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { SearchDto } from './dto/search.dto';

@Injectable()
export class NoticeService {
  constructor(
    @InjectModel(Notice.name) private noticeModel: Model<NoticeDocument>,
    private s3Service: S3Service,
  ) {}

  async getNoticesByCategory(dto: SearchDto) {
    console.log(dto);
    const notices = await this.noticeModel.find(dto);
    return notices;
  }

  async getFavotiteNotices() {
    //получить пользователя с избранными объявлениями (метод популейт)
    //вернуть масив избранных объявлений
    return `get user's favorites notices`;
  }

  async getNoticeById(id: ObjectId) {
    const notice = await this.noticeModel.findById(id);
    return notice;
  }

  async addNoticeToFavorite(id: ObjectId) {
    //достать юзера по id
    //если юзер есть, то обновить поле избранных объявлений
    //сохранить юзера
    //вернуть id объявления
    return `add notice with ${id} to user's favorite notices`;
  }

  async removeNoticeFromFavorite(id: ObjectId) {
    //если юзер есть, то обновить поле фаворитов ($pull)
    return `remove notice with ${id} from user's favorite notices`;
  }

  async addNotice(dto: CreateNoticeDto, picture: string) {
    //добавить владельца
    const picturePath = await this.s3Service.uploadFile(
      picture,
      TypeOperation.IMAGE,
    );

    const notice = await this.noticeModel.create({
      ...dto,
      imgUrl: picturePath,
    });
    return notice;
  }
}
