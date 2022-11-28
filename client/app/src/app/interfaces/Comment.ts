import { IUser } from './User';

export interface IComment {
  content: string;
  userId: IUser;
  _id: string;
  isEdited: boolean;
}
