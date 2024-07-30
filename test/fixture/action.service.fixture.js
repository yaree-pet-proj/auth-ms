const {Test} = require("@nestjs/testing");
const {ActionService} = require("../../src/service/action.service");
const {getModelToken} = require("@nestjs/sequelize");
const {ActionsModel} = require("../../src/model/actions.model");
const {ActionsMockModel} = require("../mock/action.service.mock");

async function createActionServiceFixture() {
    const module = await Test.createTestingModule({
        providers: [
            ActionService,
            {
                provide: getModelToken(ActionsModel),
                useValue: ActionsMockModel
            }
        ]
    }).compile();

    return {
        actionService: module.get(ActionService)
    };
}

module.exports = {createActionServiceFixture};