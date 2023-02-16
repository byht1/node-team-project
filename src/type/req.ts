import { UsersDocument } from 'src/db-schema/user.schema';

export interface IRequestUser extends Express.Request {
  user: UsersDocument;
  asses_token: string;
}
