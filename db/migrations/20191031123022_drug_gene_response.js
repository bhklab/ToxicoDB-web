/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
    return knex.schema.createTable('drug_gene_response', (table) => {
        table.increments('id')
            .primary();
        table.integer('experiment_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('experiments')
            .index();
        table.string('time');
        table.string('expression');
        table.string('concentration');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('drug_gene_response');
};
