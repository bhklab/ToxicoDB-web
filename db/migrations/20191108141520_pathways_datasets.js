/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
    return knex.schema.createTable('pathways_datasets', (table) => {
        table.integer('pathway_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('pathways')
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
    return knex.schema.dropTable('pathways_datasets');
};
