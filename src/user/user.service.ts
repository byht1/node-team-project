import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from 'src/db-schema/user.schema';
import { TId } from 'src/type';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}

  async userById(id: TId): Promise<UsersDocument> {
    return await this.usersModel.findById(id);
  }

  async userByEmail(email: string): Promise<UsersDocument> {
    return await this.usersModel.findOne({ email: email });
  }

  async userByUsername(username: string): Promise<UsersDocument> {
    return await this.usersModel.findOne({ name: username });
  }
}
