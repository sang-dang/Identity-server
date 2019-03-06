import { HttpStatus, Query } from '@nestjs/common';
import { Get, Controller, Post, Body, Res } from '@nestjs/common';
import { ClientService } from './client.service';
import { Login } from 'shared/model/user';
import { ClientRegister } from '../shared/model/client';

@Controller('client')
export class UserController {
  constructor(private readonly _clientService: ClientService) {}

  @Post('register')
  async login(@Body() body: ClientRegister, @Res() res) {
    await this._clientService.add(body).then(data => {
      if (data) {
        res.status(HttpStatus.OK).end(data);
      }
      res.status(HttpStatus.BAD_REQUEST).end('Failed');
    });
  }
}
