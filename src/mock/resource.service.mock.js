const {randomUUID} = require('node:crypto');
const DB_NAMES = require('../database/constants').DB_NAMES;
const SequelizeMock = require('sequelize-mock');

// Initialize SequelizeMock
const mock = new SequelizeMock();
let REPO = [
    {id: randomUUID(), name: 'admin'},
    {id: randomUUID(), name: 'user'},
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
    return REPO.map(item => ResourceMockModel.build(item));
};

ResourceMockModel.findOne = async (id) => {
    const res = REPO.find(item => item.id === id.where.id);
    return res === undefined ? undefined : ResourceMockModel.build(res);
};

ResourceMockModel.create = async (values) => {
    const record = ResourceMockModel.build(values);
    REPO.push(record.dataValues);
    return record;
};

ResourceMockModel.destroy = async (id) => {
    REPO = REPO.filter(item => item.id !== id.where.id);
};

ResourceMockModel.update = async (values, id) => {
    let rows = REPO.filter(item => item.id === id.where.id);
    rows = rows.map(row => {
        return {
            id: row.id,
            name: values.name
        };
    });
    REPO = REPO.map(item => item.id === id.where.id ? {...item, name: values.name} : item);
    return Promise.resolve([rows.length, rows]);
};

module.exports = ResourceMockModel;