import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { S3Service, TypeOperation } from 'src/AWS/s3.service';
import { Users, UsersDocument } from 'src/db-schema/user.schema';
import { TId } from 'src/type';
import { EditingUserDto } from './dto/editingUser.dto';

@Injectable()
export class UserService {
  private resDate = '-password -asses_token -refresh_token';

  constructor(@InjectModel(Users.name) private usersModel: Model<UsersDocument>, private s3servise: S3Service) {}

  async currentUser(id: TId) {
    return await this.usersModel.findById(id, this.resDate);
  }

  async editingData(editingUserDto: EditingUserDto, id: TId) {
    const user = await this.usersModel.findByIdAndUpdate(id, editingUserDto, { new: true });

    return this.normalizeData(user);
  }

  async editingPhoto(file: any, userId: TId) {
    const photoUrl = await this.s3servise.uploadFile(file, TypeOperation.AVSTAR);

    const user = await this.usersModel.findByIdAndUpdate(userId, { photo: photoUrl }, { new: true });

    return this.normalizeData(user);
  }

  async addFavirite(userId: TId, advertisementId: ObjectId) {
    const user = await this.usersModel.findById(userId);

    user.favorite.push(advertisementId);
    await user.save();

    return true;
  }

  async getFavotiteNotices(userId: TId) {
    const user = await this.usersModel.findById(userId, 'favorite').populate('favorite');

    return user.favorite;
  }

  async removeNoticeFromFavorite(userId: TId, noticeId: ObjectId | any): Promise<ObjectId> {
    await this.usersModel.findByIdAndUpdate(userId, {
      $pull: { favorite: noticeId },
    });
    return noticeId;
  }

  async addNoticeToFavorite(userId: TId, noticeId: ObjectId): Promise<ObjectId> {
    const user = await this.usersModel.findById(userId);

    user.favorite.push(noticeId);
    await user.save();

    return noticeId;
  }

  // async getAdvertisement(userId: TId) {
  //   const user = await (await this.usersModel.findById(userId)).populate('advertisement');

  //   return user.advertisement;
  // }

  // async removeAdvertisement(userId: TId, advertisementId: ObjectId | any) {
  //   const user = await this.usersModel.findById(userId);

  //   (user.advertisement = user.advertisement.filter(x => x.toString() !== advertisementId)), await user.save();

  //   return true;
  // }

  async userById(id: TId): Promise<UsersDocument> {
    return await this.usersModel.findById(id);
  }

  async userByEmail(email: string): Promise<UsersDocument> {
    return await this.usersModel.findOne({ email: email });
  }

  async userByUsername(username: string): Promise<UsersDocument> {
    return await this.usersModel.findOne({ name: username });
  }

  private normalizeData(user: UsersDocument) {
    const res: { [key: string]: any } = { ...user };

    delete res._doc.password;
    delete res._doc.asses_token;
    delete res._doc.refresh_token;

    return { ...res._doc };
  }
}
