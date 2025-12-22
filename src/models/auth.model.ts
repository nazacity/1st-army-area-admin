import { IUser } from './admin.model';

export interface IAuth {
  token: { accessToken: string };
  user: IUser;
}
