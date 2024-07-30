const {Test} = require("@nestjs/testing");
const {getModelToken} = require("@nestjs/sequelize");
const {ResourceService} = require("../../src/service/resource.service");
const {ResourceModel} = require("../../src/model/resource.model");
const {ResourceMockModel} = require("../mock/resource.service.mock");

async function createResourceServiceFixture() {
    const module = await Test.createTestingModule({
        providers: [
            ResourceService,
            {
                provide: getModelToken(ResourceModel),
                useValue: ResourceMockModel
            }
        ]
    }).compile();

    const resourceService = module.get(ResourceService);
    return {resourceService};
}

module.exports = {createResourceServiceFixture};