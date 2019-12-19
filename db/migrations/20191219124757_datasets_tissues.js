/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
    return knex.schema.createTable('datasets_tissues', (table) => {
        table.integer('dataset_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('datasets')
            .index();
        table.integer('tissue_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('tissues')
            .index();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('datasets_tissues');
};
