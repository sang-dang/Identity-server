import { Table, Column, IsUUID, Unique, AllowNull, BeforeCreate, Model, AutoIncrement, PrimaryKey } from 'sequelize-typescript';
import * as crypto from 'crypto-js';

@Table
export class User extends Model<User>{
  @PrimaryKey
  @Column
  CustomerId: string;

  @Column
  LastName: string;

  @Column
  FirstName: string;

  @Column
  Email: string;

  @Column
  Password: string;

  @Column
  PhoneNo: string;

  @Column
  Gender: string;

  @Column
  DateOfBirth: Date;

  @BeforeCreate
  static hashPassword(user: User) {
    user.Password = crypto.SHA256(user.Password).toString();
  }
}

@Table
export class ResetPassword extends Model<ResetPassword>{
  @Column
  id: number;

  @Unique
  @PrimaryKey
  @Column
  email: string;

  @Column
  key: string;
}

@Table
export class AccessToken extends Model<AccessToken> {
  @Column
  email: string;

  @Column
  password: string;

  @Column
  accessToken: string;
}
