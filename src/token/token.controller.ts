import { Controller, Get } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
    constructor(private readonly _tokenService: TokenService) {
    }
    @Get()
    public getCat() {
        const mockModel = {
            email: 'elise@gmail.com',
            accessToken: 'someasdasdasdasd7481hjasshd12up91ujaisdthing',
        };
        return this._tokenService.create(mockModel);
    }
}