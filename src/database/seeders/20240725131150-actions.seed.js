'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const {DB_NAMES} = require("../constants");

/** @type {import('sequelize-cli').Migration} */
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
