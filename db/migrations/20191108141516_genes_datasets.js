
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
    return knex.schema.createTable('genes_datasets', (table) => {
        table.integer('gene_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('genes')
            .index();
        table.integer('dataset_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('datasets')
            .index();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('genes_datasets');
};
