
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
    return knex.schema.createTable('compound_synonyms', (table) => {
        table.increments('id')
            .primary();
        table.integer('compound_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('compounds')
            .index();
        table.string('synonym')
            .notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('compound_synonyms');
};
