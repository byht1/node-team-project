/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model, ObjectId } from 'mongoose';
import { S3Service } from 'src/AWS/s3.service';
import { CommentDocument } from 'src/db-schema/comments.scheme';
import { Notice } from 'src/db-schema/notice.schema';
import { PetDocument } from 'src/db-schema/pets.schema';
import { PostDocument } from 'src/db-schema/post.schema';
import { Users, UsersDocument } from 'src/db-schema/user.schema';
import { TId } from 'src/type';
import { EditingUserDto } from './dto/editingUser.dto';
export declare class UserService {
    private usersModel;
    private s3servise;
    private resDate;
    private scipDate;
    constructor(usersModel: Model<UsersDocument>, s3servise: S3Service);
    currentUser(id: TId): Promise<import("mongoose").Document<unknown, any, UsersDocument> & Users & Document & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>>;
    editingData(editingUserDto: EditingUserDto, id: TId): Promise<any>;
    editingPhoto(file: any, userId: TId): Promise<any>;
    addFavirite(userId: TId, advertisementId: ObjectId): Promise<boolean>;
    getFavotiteNotices(userId: TId): Promise<import("mongoose").Schema.Types.ObjectId[]>;
    removeNoticeFromFavorite(userId: TId, noticeId: ObjectId | any): Promise<ObjectId>;
    addNoticeToFavorite(userId: TId, noticeId: ObjectId): Promise<ObjectId>;
    allUserPets(userId: TId): Promise<UsersDocument>;
    addPet(userId: TId, pet: PetDocument): Promise<void>;
    removePet(userId: TId, pet: PetDocument): Promise<void>;
    addPost(userId: TId, post: PostDocument): Promise<void>;
    removePost(userId: TId, post: PostDocument): Promise<void>;
    addComment(userId: TId, comment: CommentDocument): Promise<void>;
    removeComment(userId: TId, comment: CommentDocument): Promise<void>;
    addNotise(userId: TId, post: Notice): Promise<void>;
    removeNotise(userId: TId, post: Notice): Promise<void>;
    userById(id: TId): Promise<UsersDocument>;
    userByEmail(email: string): Promise<UsersDocument>;
    userByUsername(username: string): Promise<UsersDocument>;
    private normalizeData;
}
