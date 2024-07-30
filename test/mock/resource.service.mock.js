const {randomUUID} = require('node:crypto');
const DB_NAMES = require('../../src/database/constants').DB_NAMES;
const SequelizeMock = require('sequelize-mock');

// Initialize SequelizeMock
const mock = new SequelizeMock();
let repo = [
    {id: randomUUID(), name: 'admin'},
    {id: randomUUID(), name: 'user'},
    {id: randomUUID(), name: 'delete'},
    {id: randomUUID(), name: 'delete2'},
];

const ResourceMockModel = mock.define(DB_NAMES.resources, {
        id: randomUUID(),
        name: {
            type: SequelizeMock.STRING,
        }
    },
    {
        hasPrimaryKeys: false,
        timestamps: false
    });

ResourceMockModel.findAll = async () => {
    return repo.map(item => ResourceMockModel.build(item));
};

ResourceMockModel.findOne = async (id) => {
    const res = repo.find(item => item.id === id.where.id);
    return res === undefined ? undefined : ResourceMockModel.build(res);
};

ResourceMockModel.create = async (values) => {
    const record = ResourceMockModel.build(values);
    repo.push(record.dataValues);
    return record;
};

ResourceMockModel.destroy = async (id) => {
    const size = repo.length;
    repo = repo.filter(item => item.id !== id.where.id);
    return Promise.resolve(size - repo.length);
};

ResourceMockModel.update = async (values, id) => {
    let rows = repo.filter(item => item.id === id.where.id);
    rows = rows.map(row => {
        return {
            id: row.id,
            name: values.name
        };
    });
    repo = repo.map(item => item.id === id.where.id ? {...item, name: values.name} : item);
    return Promise.resolve([rows.length, rows]);
};

module.exports = {ResourceMockModel};