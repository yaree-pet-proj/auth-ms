const {randomUUID} = require('node:crypto');
const DB_NAMES = require('../../src/database/constants').DB_NAMES;
const SequelizeMock = require('sequelize-mock');

// Initialize SequelizeMock
const mock = new SequelizeMock();
const repo = [
    {id: randomUUID(), name: 'create'},
    {id: randomUUID(), name: 'read'},
    {id: randomUUID(), name: 'update'},
    {id: randomUUID(), name: 'delete'}
];

const ActionsMockModel = mock.define(DB_NAMES.actions, {
        id: randomUUID(),
        name: {
            type: SequelizeMock.STRING,
        }
    },
    {
        hasPrimaryKeys: false,
        timestamps: false
    });


ActionsMockModel.findAll = async (id) => {
    return repo.map(action => ActionsMockModel.build(action));
}

ActionsMockModel.findOne = async (id) => {
    const repo = await ActionsMockModel.findAll();
    return repo.find(record => record.id === id.where.id);
};

module.exports = {ActionsMockModel};
