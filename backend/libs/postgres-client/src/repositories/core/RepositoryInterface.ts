export interface RepositoryInterface {
    create(data: object): Promise<any>;
    findAll(): Promise<object[]>;
    
    groupBy(
        byFields: String[],
        conditions: Record<string, any>,
    ): Promise<object[]>;
    
    upsert(
        conditions: Record<string, any>,
        updateData: Record<string, any>,
        createData: Record<string, any>,
    ): Promise<any>;
    
    updateMany(
        conditions: Record<string, any>,
        data: Record<any, any>,
    ): Promise<any>;
}
