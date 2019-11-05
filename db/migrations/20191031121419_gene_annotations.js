/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
    return knex.schema.createTable('gene_annotations', (table) => {
        table.integer('gene_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('genes')
            .index();
        table.string('entrez_id');
        table.string('hgnc_id');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('gene_annotations');
};
