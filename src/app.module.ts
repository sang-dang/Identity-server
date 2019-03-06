import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorizeModule } from 'authorize/authorize.module';
import { UserModule } from 'user/user.module';
import { TokenModule } from 'token/token.module';

@Module({
  imports: [
    TokenModule,
    MongooseModule.forRoot('mongodb://localhost/nest'),
    AuthorizeModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
