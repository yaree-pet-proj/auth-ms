const {Test} = require('@nestjs/testing');
const {getModelToken} = require("@nestjs/sequelize");
const {
    describe,
    beforeEach,
    it,
    expect
} = require('@jest/globals');
const {PermissionModel} = require("../model/permission.model");
const {PermissionService} = require("../service/permission.service");
const PermissionMockModel = require("../mock/permission.service.mock");
const {randomUUID} = require("node:crypto");
const {isUUID} = require("class-validator");


describe("Permission Service", () => {

    let service;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                PermissionService,
                {
                    provide: getModelToken(PermissionModel),
                    useValue: PermissionMockModel
                }
            ]
        }).compile();
        service = module.get(PermissionService);
    });
    it("Should be defined", () => {
        expect(service).toBeDefined();
    });
    it('should return records', async () => {
        let result = await service.findAll('test');
        expect(result.length).toEqual(2);
        expect(result.every(item => item.resource_id === 'test')).toEqual(true);
    });
    it('should create one', async () => {
        let resourceId = randomUUID();
        let createdRecord = await service.createOne({
            action_id: randomUUID(),
            resource_id: resourceId
        });
        expect(isUUID(createdRecord.id)).toEqual(true);
        expect(isUUID(createdRecord.action_id)).toEqual(true);
        expect(isUUID(createdRecord.resource_id)).toEqual(true);
        expect(createdRecord.resource_id).toEqual(resourceId);
    });
    it('should find created record', async () => {
        let resourceId = randomUUID();
        await service.createOne({
            action_id: randomUUID(),
            resource_id: resourceId
        });
        let response = await service.findAll(resourceId);
        expect(response.length).toEqual(1);
        expect(response.every(item => item.resource_id === resourceId)).toEqual(true);
    });
    it('should delete one', async () => {
        let repo = await service.findAll('delete');
        let response = await service.deleteOne(repo[0].id);
        expect(response).toEqual(1);
        let afterDelete = await service.findAll('delete');
        expect(afterDelete.length).toEqual(0);
    });
});
