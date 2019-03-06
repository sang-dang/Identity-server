import { ClientService } from './../client/client.service';
import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { UserRegister, PasswordChange, Login } from 'shared/model/user';
import { ResponseData } from 'shared/model/response';
import { ClientInfo } from 'shared/model/client';

@Injectable()

export class UserService {
    constructor(
        @Inject('UserRepository') private readonly userRepository: typeof User,
        // private _clientService: ClientService,
    ) {

    }
    public async add(data: UserRegister): Promise<ResponseData> {
        let user = await this.userRepository.findOne({ where : {email: data.email} });
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
        user = new User();
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
        const user = await this.userRepository.findOne({ where : {email: data.email} });
        if (data.newPassword !== data.retypePassword) {
            return false;
        }
        if (user.password === data.oldPassword) {
            await this.userRepository.update({
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
        const user = await this.userRepository.findOne({ where : {email: data.email} });
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
        if (!user && user.password !== login.password) {
            return;
        }
        // if (this.validateClient(clientInfo.client_id)) {
        //     const token = this.generateAccessToken(user.email);
        //     return token;
        // }
    }

    public generateAccessToken(emailInfo: string): string {
        const token = 'asda21312';
        this.userRepository.update({
            access_token: token,
        },
        {
            where: { email: emailInfo },
        });
        return token;
    }

    public validateClient(clientId: number) {
        // return this._clientService.get(clientId);
    }
}