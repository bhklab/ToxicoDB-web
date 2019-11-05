/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
    return knex.schema.createTable('drug_gene_response', (table) => {
        table.increments('id')
            .primary();
        table.integer('sample_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('samples')
            .index();
        table.integer('time');
        table.float('concentration');
        table.integer('replicate_id');
        table.float('expression');
        table.integer('experiment_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('experiments')
            .index();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('drug_gene_response');
};
