import type { Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone?: number;
  state?: string;
  city?: string;
  bio?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}
