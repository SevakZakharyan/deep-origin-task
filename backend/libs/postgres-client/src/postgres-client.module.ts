import { ShortLinksRepository } from '@app/postgres-client/repositories/short-links.repository';
import { Module } from '@nestjs/common';
import { PostgresClientService } from './postgres-client.service';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
    imports: [
        PrismaModule,
    ],
    providers: [
        PostgresClientService,
        ShortLinksRepository,
    ],
    exports: [
        PostgresClientService,
        ShortLinksRepository,
    ],
})
export class PostgresClientModule {}
