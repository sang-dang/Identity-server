import * as mongoose from 'mongoose';

export const TokenSchema = new mongoose.Schema({
  email: String,
  accessToken: String,
});