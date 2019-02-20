import { AuthorizeService } from './authorize.service';
import { AuthorizeController } from './authorize.controller';
import { Module } from '@nestjs/common';
import { authorizeProviders } from './authorize.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [AuthorizeController],
    providers: [
        AuthorizeService,
    ...authorizeProviders],
})
export class AuthorizeModule {}
