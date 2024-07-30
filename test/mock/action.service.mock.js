const {randomUUID} = require('node:crypto');
const DB_NAMES = require('../../src/database/constants').DB_NAMES;
const SequelizeMock = require('sequelize-mock');

// Initialize SequelizeMock
const mock = new SequelizeMock();

const ActionsMockModel = mock.define(DB_NAMES.actions,
    {id: 'fake', name: 'default'},
    {
        hasPrimaryKeys: false,
        timestamps: false
    });

ActionsMockModel.$queueResult([
    ActionsMockModel.build({id: randomUUID(), name: 'create'}),
    ActionsMockModel.build({id: randomUUID(), name: 'read'}),
    ActionsMockModel.build({id: randomUUID(), name: 'update'}),
    ActionsMockModel.build({id: randomUUID(), name: 'delete'})
]);

ActionsMockModel.findOne = async (id) => {
    const repo = await ActionsMockModel.findAll();
    return repo.find(record => record.id === id.where.id);
};

module.exports = {ActionsMockModel};
