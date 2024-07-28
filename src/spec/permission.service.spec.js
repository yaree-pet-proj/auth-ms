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
});
