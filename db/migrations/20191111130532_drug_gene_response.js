/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
    return knex.schema.createTable('compound_gene_response', (table) => {
        table.increments('id')
            .primary();
        table.integer('sample_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('samples')
            .index();
        table.integer('gene_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('genes')
            .index();
        table.integer('analysis_id')
            .unsigned()
            .references('id')
            .inTable('analysis')
            .index();
        table.float('expression', 16, 8);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('compound_gene_response');
};
