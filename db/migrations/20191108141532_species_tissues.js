/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
    return knex.schema.createTable('species_tissues', (table) => {
        table.integer('tissue_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('tissues')
            .index();
        table.integer('species_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('species')
            .index();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('species_tissues');
};
