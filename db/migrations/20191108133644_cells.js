/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
    return knex.schema.createTable('cells', (table) => {
        table.increments('id')
            .primary();
        table.integer('species_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('species')
            .index();
        table.integer('tissue_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('tissues')
            .index();
        table.string('name')
            .notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('cells');
};
