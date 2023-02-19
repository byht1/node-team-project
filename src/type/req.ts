import { Request } from 'express';
import { UsersDocument } from 'src/db-schema/user.schema';

export interface IRequestUser extends Request {
  user: UsersDocument;
  access_token: string;
}
