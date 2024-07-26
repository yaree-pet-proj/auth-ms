'use strict';

const {DB_NAMES} = require("../constants");

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(DB_NAMES.actions, {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal('gen_random_uuid()'),
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                unique: true
            }
        });
        await queryInterface.createTable(DB_NAMES.resources, {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal('gen_random_uuid()'),
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                unique: true
            }
        });
        await queryInterface.createTable(DB_NAMES.permissions, {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal('gen_random_uuid()'),
                allowNull: false,
                primaryKey: true
            },
            action_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: DB_NAMES.actions,
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            resource_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: DB_NAMES.resources,
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable(DB_NAMES.permissions);
        await queryInterface.dropTable(DB_NAMES.resources);
        await queryInterface.dropTable(DB_NAMES.actions);
    }
};
