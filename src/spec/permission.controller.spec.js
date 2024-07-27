const {Test} = require('@nestjs/testing');
const {getModelToken} = require("@nestjs/sequelize");
const ActionsMockModel = require("../mock/action.service.mock");
const {
    describe,
    beforeEach,
    it,
    expect
} = require('@jest/globals');
const {PermissionModel} = require("../model/permission.model");
const {PermissionService} = require("../service/permission.service");


describe("Action Service", () => {

    let service;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                PermissionService,
                {
                    provide: getModelToken(PermissionModel),
                    useValue: ActionsMockModel
                }
            ]
        }).compile();
        service = module.get(PermissionService);
    });
    it("Should be defined", () => {
        expect(service).toBeDefined();
    });
});
