const {Test} = require('@nestjs/testing');
const {ActionService} = require("../service/action.service");
const {getModelToken} = require("@nestjs/sequelize");
const {ActionsModel} = require("../model/actions.model");
const ActionsMockModel = require("../mock/action.service.mock");
const {
    describe,
    beforeEach,
    it,
    expect
} = require('@jest/globals');
const {randomUUID} = require("node:crypto");


describe("Action Service", () => {

    let service;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                ActionService,
                {
                    provide: getModelToken(ActionsModel),
                    useValue: ActionsMockModel
                }
            ]
        }).compile();
        service = module.get(ActionService);
    });
    it("Should be defined", () => {
        expect(service).toBeDefined();
    });
    it('should return all records', async () => {
        let actualResult = await service.findAll();
        expect(actualResult).toEqual(expect.arrayContaining([
            expect.objectContaining({name: 'create'}),
            expect.objectContaining({name: 'read'}),
            expect.objectContaining({name: 'update'}),
            expect.objectContaining({name: 'delete'}),
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
