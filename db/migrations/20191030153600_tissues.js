exports.up = function(knex, Promise) {
    return knex.schema.createTable('tissues', (table) => {
        table.increments('id')
             .primary();
        table.string('name')
             .notNullable();
        table.string('code')
             .notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('tissues');
};