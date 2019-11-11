/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
    return knex.schema.createTable('analysis', (table) => {
        table.increments('id')
            .primary();
        table.float('fold_change')
            .notNullable();
        table.float('log_odds')
            .notNullable();
        table.float('p_value')
            .notNullable();
        table.float('fdr')
            .notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('analysis');
};
