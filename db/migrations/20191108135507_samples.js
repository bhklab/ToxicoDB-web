/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
    return knex.schema.createTable('samples', (table) => {
        table.increments('id')
            .primary();
        table.integer('drug_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('drugs')
            .index();
        table.integer('cell_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('cells')
            .index();
        table.string('name')
            .notNullable();
        table.string('dose')
            .notNullable();
        table.string('time')
            .notNullable();
        table.integer('replicate')
            .notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('samples');
};
