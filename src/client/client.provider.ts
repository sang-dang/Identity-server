import { ClientEntity } from './client.entity';

export const clientProviders = [
  {
    provide: 'ClientRepository',
    useValue: ClientEntity,
  },
];