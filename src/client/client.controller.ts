import { HttpStatus, Query } from '@nestjs/common';
import { Get, Controller, Post, Body, Res } from '@nestjs/common';
import { ClientService } from './client.service';
import { Login } from 'shared/model/user';
import { ClientInfo } from '../shared/model/client';

@Controller('user')
export class UserController {
  constructor(private readonly _clientService: ClientService) {}

  @Post('login')
  async login(@Body() body: Login,  @Query() client: ClientInfo, @Res() res) {
    // await this._clientService.login(body, client).then(isSuccess => {
    //   if (isSuccess) {
    //     res.status(HttpStatus.OK).end('Successfully');
    //   }
    //   res.status(HttpStatus.BAD_REQUEST).end('Failed');
    // });
  }
}
