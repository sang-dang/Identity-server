import { ClientKey } from './../shared/model/client';
import { Injectable, Inject } from '@nestjs/common';
import { ClientEntity } from './client.entity';
import { ClientRegister } from 'shared/model/client';

@Injectable()

export class ClientService {
    constructor(
        @Inject('ClientRepository') private readonly clientRepository: typeof ClientEntity,
    ) {

    }

    public async get(clientId: number) {
        return await this.clientRepository.findOne({ where : {client_id: clientId} });
    }

    public async add(data: ClientRegister): Promise<any> {
        let client = await this.clientRepository.findOne({ where : {client_id: data.homepage} });
        if (client) {
            return;
        }
        const key: ClientKey = this.generateKey();
        client = new ClientEntity();
        client.name = data.name;
        client.homepage = data.homepage;
        client.description = data.description;
        client.redirect_uri = data.redirect_uri;
        client.client_id = key.client_id;
        client.client_secret = key.client_secret;
        await client.save();
        return key;
    }

    public generateKey(): ClientKey {
        const random = new Date();
        const miliseconds = random.getUTCMilliseconds();
        const key = new ClientKey();
        key.client_id = miliseconds;
        key.client_secret = miliseconds;
        return key;
    }
}