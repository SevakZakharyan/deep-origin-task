import { BaseRepository } from '@app/postgres-client/repositories/core/BaseRepositroy';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class ShortLinksRepository extends BaseRepository<'shortLink'> {
    constructor(protected readonly dbClient: PrismaService) {
        super(dbClient, 'shortLink');
    }
}
