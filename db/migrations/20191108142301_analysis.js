/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
    return knex.schema.createTable('analysis', (table) => {
        table.increments('id')
            .primary();
        table.integer('pathway_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('pathways')
            .index();
        table.integer('drug_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('drugs')
            .index();
        table.float('p_value')
            .notNullable();
        table.float('fdr')
            .notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('analysis');
};
