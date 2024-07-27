const {randomUUID} = require('node:crypto');
const DB_NAMES = require('../database/constants').DB_NAMES;
const SequelizeMock = require('sequelize-mock');

// Initialize SequelizeMock
const mock = new SequelizeMock();

const PermissionMockModel = mock.define(DB_NAMES.resources,
    {id: randomUUID(), action_id: randomUUID(), resource_id: randomUUID()},
    {
        hasPrimaryKeys: false,
        timestamps: false
    });

PermissionMockModel.$queueResult([
    PermissionMockModel.build({id: randomUUID(), action_id: randomUUID(), resource_id: randomUUID()}),
    PermissionMockModel.build({id: randomUUID(), action_id: randomUUID(), resource_id: randomUUID()}),
]);

PermissionMockModel.findOne = async (id) => {
    const repo = await PermissionMockModel.findAll();
    return repo.find(record => record.id === id.where.id);
};

module.exports = PermissionMockModel;