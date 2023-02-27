import { Model, ObjectId } from 'mongoose';
import { S3Service } from 'src/AWS/s3.service';
import { Notice, NoticeDocument } from 'src/db-schema/notice.schema';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { SearchDto } from './dto/search.dto';
import { UserService } from 'src/user/user.service';
export declare class NoticeService {
    private noticeModel;
    private s3Service;
    private userService;
    constructor(noticeModel: Model<NoticeDocument>, s3Service: S3Service, userService: UserService);
    getNoticesByCategoryAndSearch(dto: SearchDto): Promise<Notice[]>;
    getNoticeById(id: ObjectId): Promise<Notice>;
    addNotice(userId: ObjectId, dto: CreateNoticeDto, picture: string[]): Promise<Notice>;
    getUserNotices(userId: ObjectId): Promise<Notice[]>;
    removeNotice(userId: ObjectId, noticeId: ObjectId): Promise<Notice>;
}
