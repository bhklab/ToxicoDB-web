/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
    return knex.schema.createTable('species', (table) => {
        table.integer('dataset_id')
            .unsigned()
            .unique()
            .notNullable()
            .references('id')
            .inTable('datasets')
            .index();
        table.string('name')
            .notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('species');
};
