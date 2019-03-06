import { Document } from 'mongoose';

export interface AccessToken extends Document {
  email: string;
  accessToken: string;
}