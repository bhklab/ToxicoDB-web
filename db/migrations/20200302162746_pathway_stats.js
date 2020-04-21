/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
    return knex.schema.createTable('pathway_stats', (table) => {
        table.integer('id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('pathways_drugs')
            .index();
        table.string('ontology')
            .notNullable();
        table.integer('genes_total')
            .notNullable();
        table.float('stat_dis', 16, 8)
            .notNullable();
        table.integer('genes_up')
            .notNullable();
        table.integer('genes_down')
            .notNullable();
        table.float('p_value', 16, 8)
            .notNullable();
        table.float('fdr', 16, 8)
            .notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('pathway_stats');
};
