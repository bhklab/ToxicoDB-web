/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
    return knex.schema.createTable('compound_annotations', (table) => {
        table.integer('compound_id')
            .unsigned()
            .unique()
            .notNullable()
            .references('id')
            .inTable('compounds')
            .index();
        table.integer('pubchem');
        table.string('chembl');
        table.string('drugbank');
        table.string('targets');
        table.string('carcinogenicity');
        table.string('class_in_vivo');
        table.string('class_in_vitro');
        table.string('class_name');
        table.string('smiles');
        table.string('inchikey');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('compound_annotations');
};
