/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
    return knex.schema.createTable('gene_annotations', (table) => {
        table.integer('gene_id')
            .unsigned()
            .unique()
            .notNullable()
            .references('id')
            .inTable('genes')
            .index();
        table.string('ensembl_gid');
        table.string('entrez_gid');
        table.string('transcript_name');
        table.string('ensembl_tid');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('gene_annotations');
};
