import { Injectable, Inject } from '@nestjs/common';
import { ClientEntity } from './client.entity';
import { UserRegister, PasswordChange, Login } from 'shared/model/user';
import { ResponseData } from 'shared/model/response';
import { ClientInfo } from 'shared/model/client';

@Injectable()

export class ClientService {
    constructor(
        @Inject('ClientRepository') private readonly clientRepository: typeof ClientEntity,
    ) {

    }
    public async add(data: UserRegister): Promise<ResponseData> {
        let user = await this.clientRepository.findOne({ where : {: data.email} });
        if (user) {
            return {
                isSuccessfully: false,
                message: 'User already exists',
            };
        }
        if (data.password !== data.retypePassword) {
            return {
                isSuccessfully: false,
                message: 'Retype password is not match',
            };
        }
        user = new ClientInfo();
        user.fullname = data.fullname;
        user.email = data.email;
        user.password = data.password;
        await user.save().catch(err => {
            return {
                isSuccessfully: false,
                message: 'Register failed',
            };
        });
        return {
            isSuccessfully: true,
            message: 'Successfully',
        };
    }

    public async changePassword(data: PasswordChange): Promise<boolean> {
        const user = await this.clientRepository.findOne({ where : {email: data.email} });
        if (data.newPassword !== data.retypePassword) {
            return false;
        }
        if (user.password === data.oldPassword) {
            await this.clientRepository.update({
                password: data.newPassword,
            },
            {
                where: {
                    email: data.email,
                },
            });
            return true;
        }
    }

    public async delete(data: Login): Promise<boolean> {
        const user = await this.clientRepository.findOne({ where : {email: data.email} });
        if (user && user.password === data.password) {
            await this.userRepository.destroy({
                where: {email: user.email},
            });
            return true;
        }
        return false;
    }

    public async login(login: Login, clientInfo: ClientInfo) {
        const user = await this.userRepository.findOne({ where : {email: login.email} });
        if (user && user.password === login.password) {
            await this.userRepository.destroy({
                where: {email: user.email},
            });
            return true;
        }
        return false;
    }
}