import { Table, Column, IsUUID, Unique, AllowNull, BeforeCreate, Model, AutoIncrement, PrimaryKey } from 'sequelize-typescript';
import { Md5 } from 'ts-md5';

@Table
export class User extends Model<User>{
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Unique
  @Column
  email: string;

  @Column
  fullname: string;

  @Column
  password: string;

  @Column
  access_token: string;
}
