
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
    return knex.schema.createTable('compounds_datasets', (table) => {
        table.integer('compound_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('compounds')
            .index();
        table.integer('dataset_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('datasets')
            .index();
        table.string('compound_uid')
            .notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('compounds_datasets');
};
