import { ClientService } from './../client/client.service';
import { Injectable, Inject } from '@nestjs/common';
import { User, ResetPassword, AccessToken } from './user.entity';
import { UserRegister, PasswordChange, Login } from 'shared/model/user';
import { ResponseData } from 'shared/model/response';
import { ClientInfo } from 'shared/model/client';
import * as crypto from 'crypto-js';
import * as KJUR from 'jsrsasign';
import { UUID } from 'angular2-uuid';

@Injectable()

export class UserService {
    constructor(
        @Inject('UserRepository') private readonly userRepository: typeof User,
        // private _clientService: ClientService,
        @Inject('UserRepository') private readonly userRepo: typeof User,
        @Inject('ResetPasswordRepository') private readonly resetPasswordRepo: typeof ResetPassword,
        @Inject('AccessTokenRepo') private readonly accessTokenRepo: typeof AccessToken,
    ) {

    }
    public async signUp(data: UserRegister): Promise<any> {
        let user = await this.userRepo.findOne({ where : {Email: data.email} });
        if (user) {
            return {
                isSuccessfully: false,
                message: 'User already exists',
            };
        }
        if (data.password !== data.rePassword) {
            return {
                isSuccessfully: false,
                message: 'Retype password is not match',
            };
        }
        user = new User();
        user.CustomerId = UUID.UUID();
        user.FirstName = data.firstName;
        user.LastName = data.lastName;
        user.Email = data.email;
        user.Password = data.password;
        user.PhoneNo = data.phoneNo;
        user.Gender = data.gender;
        user.DateOfBirth = data.dateOfBirth;
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
        const user = await this.userRepo.findOne({ where : {Email: data.email} });
        if (data.newPassword !== data.retypePassword) {
            return false;
        }
        if (user.Password === data.oldPassword) {
            await this.userRepo.update({
                Password: data.newPassword,
            },
            {
                where: {
                    Email: data.email,
                },
            });
            return true;
        }
    }

    public async delete(data: Login): Promise<boolean> {
        const user = await this.userRepo.findOne({ where : {Email: data.email} });
        if (user && user.Password === data.password) {
            await this.userRepo.destroy({
                where: {Email: user.Email},
            });
            return true;
        }
        return false;
    }

    public async login(login: Login, clientInfo: ClientInfo): Promise<any> {
        const user = await this.userRepo.findOne({ where : {Email: login.email} });
        const hashPwd = crypto.SHA256(login.password).toString();
        if (user && user.Password === hashPwd) {
            const oHeader = {alg: 'HS256', typ: 'JWT'};
            const oPayload = {
                email: user.Email,
                fullname: user.FirstName,
            };
            const tNow = KJUR.jws.IntDate.get('now');
            const tEnd = KJUR.jws.IntDate.get('now + 1day');
            const sHeader = JSON.stringify(oHeader);
            const sPayload = JSON.stringify(oPayload);
            const sJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, 'mockSecretKey');

            const accessToken = new AccessToken();
            accessToken.email = user.Email;
            accessToken.accessToken = sJWT;
            await accessToken.save();
            return sJWT;
        }
    }

    public validateClient(client: ClientInfo) {
    }

    public async resetPassword(emailData: string): Promise<boolean> {
        const user = await this.userRepo.findOne({
            where: { Email: emailData },
        });
        if (user) {
            const date = new Date().getUTCMilliseconds();
            const hashString = [user.Email, date].join();
            const key = crypto.SHA256(hashString);
            const resetEnt = new ResetPassword();
            resetEnt.email = user.Email;
            resetEnt.key = key.toString();
            await resetEnt.save();
            return true;
        }
        return false;
    }
}