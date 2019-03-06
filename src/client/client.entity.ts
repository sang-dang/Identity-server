import { Table, Column, AutoIncrement, PrimaryKey, Model } from 'sequelize-typescript';

@Table
export class ClientEntity extends Model<ClientEntity> {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Column
    name: string;

    @Column
    homepage: string;

    @Column
    description: string;

    @Column
    redirect_uri: string;

    @Column
    client_id: number;

    @Column
    client_secret: number;

    @Column
    state: string;
}
