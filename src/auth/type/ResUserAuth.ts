import { UsersDocument } from 'src/db-schema/user.schema';

export type TResUserAuth = Omit<UsersDocument, 'access_token' | 'refresh_token' | 'password'> & {
  access_token: string;
  refresh_token: string;
};
