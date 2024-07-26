'use strict';

const {DB_NAMES} = require("../constants");

module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert(DB_NAMES.actions, [
            {name: 'create'},
            {name: 'read'},
            {name: 'update'},
            {name: 'delete'}
        ]);
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete(DB_NAMES.actions, null, {});
    }
};
