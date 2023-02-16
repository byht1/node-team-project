import { UsersDocument } from 'src/db-schema/user.schema';

export type TResUserAuth = Omit<
  UsersDocument,
  'asses_token' | 'refresh_token' | 'password'
> & {
  asses_token: string;
  refresh_token: string;
};
