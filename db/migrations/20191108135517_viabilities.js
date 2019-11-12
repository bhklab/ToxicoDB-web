/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
    return knex.schema.createTable('viabilities', (table) => {
        table.integer('sample_id')
            .unsigned()
            .unique()
            .notNullable()
            .references('id')
            .inTable('samples')
            .index();
        table.string('viability')
            .notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('viabilities');
};
