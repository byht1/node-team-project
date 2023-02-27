import mongoose, { ObjectId } from 'mongoose';
import { NoticeService } from './notice.service';
import { UserService } from 'src/user/user.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { SearchDto } from './dto/search.dto';
import { IRequestUser } from 'src/type/req';
import { Notice } from 'src/db-schema/notice.schema';
import { UploadedFilesDto } from './dto/uploaded-files.dto';
export declare class NoticeController {
    private noticeService;
    private userService;
    constructor(noticeService: NoticeService, userService: UserService);
    getNoticesByCategoryAndSearch(dto: SearchDto): Promise<Notice[]>;
    getUserNotices(request: IRequestUser): Promise<Notice[]>;
    getFavotiteNotices(request: IRequestUser): Promise<mongoose.Schema.Types.ObjectId[]>;
    addNoticeToFavorite(request: IRequestUser, id: ObjectId): Promise<mongoose.Schema.Types.ObjectId>;
    removeNoticeFromFavorite(request: IRequestUser, id: ObjectId): Promise<mongoose.Schema.Types.ObjectId>;
    getNoticeById(id: ObjectId): Promise<Notice>;
    addNotice(request: IRequestUser, files: UploadedFilesDto, dto: CreateNoticeDto): Promise<Notice>;
    removeNotice(request: IRequestUser, id: ObjectId): Promise<Notice>;
}
