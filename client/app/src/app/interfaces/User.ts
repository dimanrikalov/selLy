import { IListing } from './Listing';
import { IComment } from './Comment';

export interface IUser {
  email: string;
  password: string;
  name: string;
  profileImage: string;
  country: string;
  city: string;
  age: string;
  gender: string;
  listings: IListing[];
  savedListings:IListing[];
  comments: IComment[];
}
