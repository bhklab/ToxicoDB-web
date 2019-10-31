/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
    return knex.schema.createTable('genes', (table) => {
        table.increments('id')
            .primary();
        table.string('name')
            .notNullable();
        table.integer('dataset_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('datasets')
            .index();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('genes');
};
