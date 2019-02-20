import { CredentialDto } from './model/credential';
import {  Credential, Authorize } from './authorize.entity';
import { Injectable, Inject } from '@nestjs/common';
import { AuthorizeDto } from './model/authorize';
import { PassThrough } from 'stream';

@Injectable()
export class AuthorizeService {
  constructor(
    @Inject('CredentialRepository') private readonly credentialRepository: typeof Credential,
    @Inject('AuthorizeRepository') private readonly authorizeRepository: typeof Authorize,
  ) {}

  async getInfoQuery(clientInfo: AuthorizeDto) {
    const client = await this.authorizeRepository.findOne({
      where: {
        client_id: clientInfo.client_id,
        redirect_uri: clientInfo.redirect_uri,
      },
    });
    if (client) {
      return this.handleScope(clientInfo.scope);
    } else {
      return new Error('Client information incorrect');
    }
  }

  handleScope(scope: string): any {
    if (scope === 'SPA') {
      return {
        valid: true,
        access_token: 'mockAccessToken',
      };
    }
  }

  async createUser() {
    const userInfo = new Credential();
    userInfo.username = 'user1';
    userInfo.password = '12345';
    return await userInfo.save();
  }

  async validateUser(credential: CredentialDto): Promise<Credential> {
    return await this.credentialRepository.findOne({
      where: {
        username: credential.username,
        password: credential.password,
      },
    });
  }

  async createClientInfo(info: AuthorizeDto): Promise<AuthorizeDto> {
    const auth = new Authorize();
    auth.response_type = 'token';
    auth.redirect_uri = 'https://github.com/';
    auth.client_id = 'id0001';
    auth.scope = 'SPA';
    return await auth.save();
  }
}
