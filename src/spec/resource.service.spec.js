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


describe("Action Service", () => {

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
        let actualResult = await service.findOne('qwe');
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
});
