/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
    return knex.schema.createTable('drug_annotation', (table) => {
        table.integer('gene_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('genes')
            .index();
        table.string('ensembl_id');
        table.string('entnez_id');
        table.string('hqnc_id');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('drug_annotation');
};
