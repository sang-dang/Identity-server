import { ClientService } from './client.service';
import { UserController } from './client.controller';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { clientProviders } from './client.provider';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [
        ClientService,
    ...clientProviders],
})
export class ClientModule {}
