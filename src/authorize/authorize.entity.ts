import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Authorize extends Model<Authorize> {
    @Column response_type: string;
    @Column client_id: string;
    @Column redirect_uri: string;
    @Column scope: string;
    @Column state: string;
}

@Table
export class Credential extends Model<Credential> {
    @Column username: string;
    @Column password: string;
}