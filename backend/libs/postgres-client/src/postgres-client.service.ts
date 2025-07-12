import { Injectable } from '@nestjs/common';
import { PrismaService } from "../../../prisma/prisma.service";

@Injectable()
export class PostgresClientService {
    constructor(public dbClient: PrismaService) {}
}
