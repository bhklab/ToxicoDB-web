/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
    return knex.schema.createTable('datasets_samples', (table) => {
        table.integer('dataset_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('datasets')
            .index();
        table.integer('sample_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('samples')
            .index();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('datasets_samples');
};
