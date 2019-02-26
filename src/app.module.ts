import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorizeModule } from 'authorize/authorize.module';
import { UserModule } from 'user/user.module';

@Module({
  imports: [
    AuthorizeModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
