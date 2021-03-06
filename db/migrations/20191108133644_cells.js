/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
    return knex.schema.createTable('cells', (table) => {
        table.increments('id')
            .primary();
        table.string('name')
            .notNullable();
        table.integer('tissue_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('tissues')
            .index();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('cells');
};
