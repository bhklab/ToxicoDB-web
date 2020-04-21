
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
    return knex.schema.createTable('drug_synonyms', (table) => {
        table.increments('id')
            .primary();
        table.integer('drug_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('drugs')
            .index();
        table.string('synonym')
            .notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('drug_synonyms');
};
