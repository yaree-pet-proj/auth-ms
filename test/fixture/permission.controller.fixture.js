const {Test} = require("@nestjs/testing");
const {PermissionController} = require("../../src/controller/permission.controller");
const {ActionService} = require("../../src/service/action.service");
const {ResourceService} = require("../../src/service/resource.service");
const {PermissionService} = require("../../src/service/permission.service");
const {getModelToken} = require("@nestjs/sequelize");
const {ActionsModel} = require("../../src/model/actions.model");
const {ActionsMockModel} = require("../mock/action.service.mock");
const {ResourceModel} = require("../../src/model/resource.model");
const {ResourceMockModel} = require("../mock/resource.service.mock");
const {PermissionModel} = require("../../src/model/permission.model");
const {PermissionMockModel} = require("../mock/permission.service.mock");

async function createPermissionControllerFixture() {
    const module = await Test.createTestingModule({
        controllers: [PermissionController],
        providers: [
            ActionService,
            ResourceService,
            PermissionService,
            {provide: getModelToken(ActionsModel), useValue: ActionsMockModel},
            {provide: getModelToken(ResourceModel), useValue: ResourceMockModel},
            {provide: getModelToken(PermissionModel), useValue: PermissionMockModel}
        ]
    }).compile();

    return {
        actionService: module.get(ActionService),
        permissionService: module.get(PermissionService),
        resourceService: module.get(ResourceService),
        permissionController: module.get(PermissionController)
    };
}

module.exports = {
    createPermissionControllerFixture
};