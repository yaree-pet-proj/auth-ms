const {Test} = require('@nestjs/testing');
const {getModelToken} = require("@nestjs/sequelize");
const {
    describe,
    beforeEach,
    it,
    expect
} = require('@jest/globals');
const {randomUUID} = require("node:crypto");
const {ResourceService} = require("../service/resource.service");
const {ResourceModel} = require("../model/resource.model");
const ResourceMockModel = require("../mock/resource.service.mock");
const {isUUID} = require("class-validator");


describe("Resource Service", () => {

    let service;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                ResourceService,
                {
                    provide: getModelToken(ResourceModel),
                    useValue: ResourceMockModel
                }
            ]
        }).compile();
        service = module.get(ResourceService);
    });
    it("Should be defined", () => {
        expect(service).toBeDefined();
    });
    it('should return all records', async () => {
        let actualResult = await service.findAll();
        expect(actualResult).toEqual(expect.arrayContaining([
            expect.objectContaining({name: 'admin'}),
            expect.objectContaining({name: 'user'}),
        ]));
    });
    it('should return undefined for invalid uuid', async () => {
        let actualResult = await service.findOne('tst');
        expect(actualResult).toBeUndefined();
    });
    it('should return undefined if record doesnt exist', async () => {
        let actualResult = await service.findOne(randomUUID());
        expect(actualResult).toBeUndefined();
    });
    it('should should return one', async () => {
        let repo = await service.findAll();
        let actualResult = await service.findOne(repo[0].id);
        expect(actualResult).toEqual(repo[0]);
    });
    it('should return created record', async () => {
        let actualResult = await service.createOne('resource');
        expect(actualResult.name).toEqual('resource');
        expect(isUUID(actualResult.id)).toBeTruthy();
    });
    it('should be populated in db after create', async () => {
        let repo = await service.findAll();
        let created = await service.createOne('test');
        let afterCreate = await service.findAll();
        expect(repo.length).toBeLessThan(afterCreate.length);
        expect(afterCreate).toEqual(expect.arrayContaining([
            expect.objectContaining(created)
        ]));
    });
    it('should delete one', async () => {
        const beforeDelete = await service.findAll();
        await service.deleteOne(beforeDelete[0].id);
        const afterDelete = await service.findAll();
        expect(beforeDelete.length).toBeGreaterThan(afterDelete.length);
        expect(afterDelete).not.toEqual(expect.arrayContaining([
            expect.objectContaining(beforeDelete[0])
        ]));
    });
    it('should update record', async () => {
        const beforeUpdate = await service.findAll();
        const updatedResponse = await service.updateOne(beforeUpdate[0].id, 'updated value');
        const updatedValue = updatedResponse[1][0];
        const afterUpdate = await service.findAll();
        expect(afterUpdate).toEqual(expect.arrayContaining([
            expect.objectContaining(updatedValue)
        ]))
    });
    it('should return updated record in response', async () => {
        const repo = await service.findAll();
        const result = await service.updateOne(repo[0].id, 'updated value');
        expect(result[0]).toEqual(1);
        expect(result[1].length).toEqual(1);
        expect(result[1][0]).toEqual({id: repo[0].id, name: 'updated value'});
    });
});
