import { Table, Column, AutoIncrement, PrimaryKey, Model } from 'sequelize-typescript';

@Table
export class ClientEntity extends Model<ClientEntity> {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;
    response_type: string;

    @Column
    client_id: string;

    @Column
    redirect_uri: string;

    @Column
    scope: string;

    @Column
    state: string;
}
