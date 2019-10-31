/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
    return knex.schema.createTable('drug_annotations', (table) => {
        table.integer('drug_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('drugs')
            .index();
        table.string('pubchem');
        table.string('chembl');
        table.string('drugbank');
        table.string('targets');
        table.string('class');
        table.string('class_name');
        table.string('atc_code');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('drug_annotations');
};
