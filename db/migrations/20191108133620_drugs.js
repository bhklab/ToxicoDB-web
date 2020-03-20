/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
    return knex.schema.createTable('compounds', (table) => {
        table.increments('id')
            .primary();
        table.string('name')
            .notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('compounds');
};
