import { Authorize, Credential } from 'authorize/authorize.entity';

export const authorizeProviders = [
  {
    provide: 'CredentialRepository',
    useValue: Credential,
  },
  {
    provide: 'AuthorizeRepository',
    useValue: Authorize,
  },
];