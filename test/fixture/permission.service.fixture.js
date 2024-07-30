const {Test} = require("@nestjs/testing");
const {getModelToken} = require("@nestjs/sequelize");
const {PermissionService} = require("../../src/service/permission.service");
const {PermissionModel} = require("../../src/model/permission.model");
const {PermissionMockModel} = require("../mock/permission.service.mock");

async function createPermissionServiceFixture() {
    const module = await Test.createTestingModule({
        providers: [
            PermissionService,
            {
                provide: getModelToken(PermissionModel),
                useValue: PermissionMockModel
            }
        ]
    }).compile();

    return {
        permissionService: module.get(PermissionService)
    };
}

module.exports = {createPermissionServiceFixture};
