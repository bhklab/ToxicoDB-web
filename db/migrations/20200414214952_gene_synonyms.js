
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
    return knex.schema.createTable('gene_synonyms', (table) => {
        table.increments('id')
            .primary();
        table.integer('gene_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('genes')
            .index();
        table.string('synonym')
            .notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('gene_synonyms');
};
