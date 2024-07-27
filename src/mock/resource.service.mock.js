const {randomUUID} = require('node:crypto');
const DB_NAMES = require('../database/constants').DB_NAMES;
const SequelizeMock = require('sequelize-mock');

// Initialize SequelizeMock
const mock = new SequelizeMock();

const ResourceMockModel = mock.define(DB_NAMES.resources,
    {id: randomUUID(), name: 'test'},
    {
        hasPrimaryKeys: false,
        timestamps: false
    });

ResourceMockModel.$queueResult([
    ResourceMockModel.build({id: randomUUID(), name: 'admin'}),
    ResourceMockModel.build({id: randomUUID(), name: 'user'}),
]);

ResourceMockModel.findOne = async (id) => {
    const repo = await ResourceMockModel.findAll();
    return repo.find(record => record.id === id.where.id);
};

module.exports = ResourceMockModel;