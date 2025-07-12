import { RepositoryInterface } from '@app/postgres-client/repositories/core/RepositoryInterface';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from "../../../../../generated/prisma";


import { PrismaService } from '../../../../../prisma/prisma.service';

@Injectable()
export abstract class BaseRepository<Model extends keyof PrismaClient> implements RepositoryInterface {
    private readonly model;

    protected constructor(
        protected readonly dbClient: PrismaService,
        modelName: string,
    ) {
        this.model = dbClient[modelName] as PrismaClient[Model];
    }

    async create(data: object) {
        return this.model.create({
            data: data,
        });
    }

    async findAll() {
        return this.model.findMany();
    }

    async upsert(
        conditions: Record<string, any>,
        updateData: Record<string, any>,
        createData: Record<string, any>,
    ): Promise<any> {
        return this.model.upsert({
            where: conditions,
            update: updateData,
            create: createData,
        });
    }

    async update(conditions: Record<string, any>, data: Record<any, any>): Promise<any> {
        return this.model.update({
            where: {
                ...conditions,
            },
            data: {
                ...data,
            },
        });
    }

    async updateMany(conditions: Record<string, any>, data: Record<any, any>): Promise<any> {
        return this.model.updateMany({
            where: {
                ...conditions,
            },
            data: {
                ...data,
            },
        });
    }

    async findOne(id: string): Promise<any> {
        return this.model.findOne(id);
    }

    async findOneByCondition(conditions: Record<string, any>): Promise<any> {
        return this.model.findFirst({
            ...conditions,
        });
    }

    async findByCondition(condition: Record<string, any>): Promise<any> {
        return this.model.findMany({
            ...condition,
        });
    }

    async groupBy(byFields: string[], conditions: Record<string, any>): Promise<any> {
        return this.model.groupBy({
            by: byFields,
            ...conditions,
        });
    }
}
