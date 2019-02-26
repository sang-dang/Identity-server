import { Get, Controller, Query, Res, HttpStatus, Post, Body } from '@nestjs/common';
import { AuthorizeService } from './authorize.service';

@Controller('authorize')
export class AuthorizeController {
  constructor(private readonly authorizeService: AuthorizeService) {}

  // @Get('')
  // root(@Query() query, @Res() res) {
  //   const redirectUrl = this.authorizeService.getInfoQuery(query);
  //   res.redirect(redirectUrl.toString());
  // }

  @Post('')
  async handleQuery(@Query() query, @Body() body, @Res() res){
    const user = await this.authorizeService.validateUser(body);
    if (user) {
      return this.authorizeService.getInfoQuery(query);
    } else {
      return 'Failed';
    }
  }
  
  @Post('/create')
  create() {
    return this.authorizeService.createUser();
  }
}
