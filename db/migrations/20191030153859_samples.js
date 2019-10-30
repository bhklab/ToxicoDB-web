
exports.up = function(knex, Promise) {
    return knex.schema.createTable('samples', (table) => {
        table.increments('id')
             .primary();
        table.string('name')
             .notNullable();
        table.string('type')
             .notNullable();
        table.integer('tissue_id')
             .notNullable()
             .unsigned()
             .references('id')
             .inTable('tissues')
             .index();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('samples');
};