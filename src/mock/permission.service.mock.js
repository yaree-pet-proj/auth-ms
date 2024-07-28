const {randomUUID} = require('node:crypto');
const DB_NAMES = require('../database/constants').DB_NAMES;
const SequelizeMock = require('sequelize-mock');

// Initialize SequelizeMock
const mock = new SequelizeMock();

let repo = [
    {id: randomUUID(), action_id: randomUUID(), resource_id: randomUUID()},
    {id: randomUUID(), action_id: randomUUID(), resource_id: 'test'},
    {id: randomUUID(), action_id: randomUUID(), resource_id: 'test'},
    {id: randomUUID(), action_id: randomUUID(), resource_id: 'delete'},
];

const PermissionMockModel = mock.define(DB_NAMES.permissions, {
    id: randomUUID(),
    action_id: randomUUID(),
    resource_id: randomUUID()
}, {
    hasPrimaryKeys: false,
    timestamps: false
});

PermissionMockModel.findAll = async (resource_id) => {
    let rows = repo.filter(row => row.resource_id === resource_id.where.resource_id);
    return rows.map(item => PermissionMockModel.build(item));
};

PermissionMockModel.create = async (values) => {
    const record = PermissionMockModel.build(values);
    repo.push(record.dataValues);
    return record;
};

PermissionMockModel.destroy = async (payload) => {
    const size = repo.length;
    repo = repo.filter(item => item.id !== payload.where.id);
    return Promise.resolve(size - repo.length);
};

module.exports = PermissionMockModel;
