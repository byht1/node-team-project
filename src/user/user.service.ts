import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { S3Service, TypeOperation } from 'src/AWS/s3.service';
import { CommentDocument } from 'src/db-schema/comments.schema';
import { Notice } from 'src/db-schema/notice.schema';
import { PetDocument } from 'src/db-schema/pets.schema';
import { PostDocument } from 'src/db-schema/post.schema';
import { Users, UsersDocument } from 'src/db-schema/user.schema';
import { TId } from 'src/type';
import { EditingUserDto } from './dto/editingUser.dto';

@Injectable()
export class UserService {
  private resDate = '-password -access_token -refresh_token';
  private scipDate = {
    createdAt: 0,
    updatedAt: 0,
    password: 0,
    access_token: 0,
    refresh_token: 0,
    favorite: 0,
    advertisement: 0,
    forgottenPasswordToken: 0,
    verificationToken: 0,
    forgottenPassword: 0,
  };

  constructor(@InjectModel(Users.name) private usersModel: Model<UsersDocument>, private s3servise: S3Service) {}

  async currentUser(id: TId) {
    return await this.usersModel.findById(id, this.resDate);
  }

  async editingData(editingUserDto: EditingUserDto, id: TId) {
    const { email } = editingUserDto;

    if (email) {
      const isUser = await this.usersModel.findOne({ email });

      if (isUser) throw new HttpException('Email in use', HttpStatus.CONFLICT);
    }

    const user = await this.usersModel
      .findByIdAndUpdate(id, editingUserDto, { new: true })
      .select({ ...this.scipDate, cards: 0 });

    return this.normalizeData(user);
  }

  async editingPhoto(file: any, userId: TId) {
    const photoUrl = await this.s3servise.uploadFile(file, TypeOperation.AVSTAR);

    const user = await this.usersModel.findByIdAndUpdate(userId, { photo: photoUrl }, { new: true });

    return this.normalizeData(user);
  }

  async addNotice(userId: TId, notice: Notice) {
    const user = await this.usersModel.findById(userId);

    user.advertisement.push(notice._id);
    user.save();

    return;
  }

  async removeNotise(userId: TId, notice: Notice) {
    const user = await this.usersModel.findById(userId);

    user.advertisement = user.advertisement.filter(x => x.toString() !== notice._id.toString());
    user.save();

    return;
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

  async addNoticeToFavorite(userId: TId, noticeId: ObjectId): Promise<ObjectId> {
    const user = await this.usersModel.findById(userId);

    user.favorite.push(noticeId);
    await user.save();

    return noticeId;
  }

  async removeNoticeFromFavorite(userId: TId, noticeId: ObjectId | any): Promise<ObjectId> {
    await this.usersModel.findByIdAndUpdate(userId, {
      $pull: { favorite: noticeId },
    });
    return noticeId;
  }

  async allUserPets(userId: TId): Promise<UsersDocument> {
    const user = await this.usersModel.findById(userId).populate('cards').select(this.scipDate);

    return user;
  }

  async addPet(userId: TId, pet: PetDocument): Promise<void> {
    const user = await this.usersModel.findById(userId);

    user.cards.push(pet._id);
    await user.save();

    return;
  }

  async removePet(userId: TId, petId: ObjectId): Promise<void> {
    const user = await this.usersModel.findById(userId);

    const petIdToString = petId.toString();
    user.cards = user.cards.filter(x => x.toString() !== petIdToString);
    
    await user.save();

    return;
  }

  async addPost(userId: TId, post: PostDocument): Promise<void> {
    const user = await this.usersModel.findById(userId);

    user.posts.push(post._id);
    await user.save();

    return;
  }

  async removePost(userId: TId, postId: ObjectId): Promise<void> {
    const user = await this.usersModel.findById(userId);

    const postIdToString = postId.toString();
    user.posts = user.posts.filter(x => x.toString() !== postIdToString);

    await user.save();

    return;
  }

  async addComment(userId: TId, comment: CommentDocument): Promise<void> {
    const user = await this.usersModel.findById(userId);

    user.comments.push(comment._id);
    await user.save();

    return;
  }

  async removeComment(userId: TId, commentId: ObjectId): Promise<void> {
    const user = await this.usersModel.findById(userId);

    const commentIdToString = commentId.toString();
    user.comments = user.comments.filter(x => x.toString() !== commentIdToString);
    
    await user.save();

    return;
  }

  async userById(id: TId): Promise<UsersDocument> {
    return await this.usersModel.findById(id);
  }

  async userByEmail(email: string): Promise<UsersDocument> {
    const regex = new RegExp(email, 'i');
    return await this.usersModel.findOne({ email: regex });
  }

  async userByUsername(username: string): Promise<UsersDocument> {
    return await this.usersModel.findOne({ name: username });
  }

  private normalizeData(user: UsersDocument) {
    const res: { [key: string]: any } = { ...user };

    delete res._doc.password;
    delete res._doc.access_token;
    delete res._doc.refresh_token;

    return { ...res._doc };
  }
}
