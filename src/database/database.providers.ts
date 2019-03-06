import { ClientEntity } from './../client/client.entity';
import { User, ResetPassword, AccessToken } from './../user/user.entity';
import { Sequelize } from 'sequelize-typescript';
import { Authorize, Credential } from '../authorize/authorize.entity';

export const databaseProviders = [
  {
    provide: 'SequelizeToken',
    useFactory: async () => {
      const sequelize = new Sequelize({
        operatorsAliases: false,
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'nest',
      });
      sequelize.addModels([
        Authorize,
        Credential,
        User,
        ClientEntity,
        ResetPassword,
        AccessToken,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];