import {IUser} from './User';
import { IComment } from './Comment';
export interface IListing {
    item: string, 
    type: string,
    brand: string,
    imageUrl: string,
    description: string,
    location: string,
    price: number,
    seller: IUser,
    comments: IComment[]
}