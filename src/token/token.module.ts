import { TokenSchema } from './token.schema';
import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'TokenRepo', schema: TokenSchema, collection: 'token' }]),
  ],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}