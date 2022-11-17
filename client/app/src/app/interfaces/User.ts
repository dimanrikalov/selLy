import { IListing } from './Listing';
import { IComment } from './Comment';

export interface IUser {
  email: string;
  password: string;
  name: string;
  profileImage: string;
  listings: IListing[];
  savedListings:IListing[];
  comments: IComment[];
  _id: string
}
