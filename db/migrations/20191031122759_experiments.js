/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
    return knex.schema.createTable('experiments', (table) => {
        table.increments('id')
            .primary();
        table.integer('drug_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('drugs')
            .index();
        table.integer('gene_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('genes')
            .index();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('experiments');
};
