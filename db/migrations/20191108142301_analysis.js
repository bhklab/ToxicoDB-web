/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
    return knex.schema.createTable('analysis', (table) => {
        table.integer('id')
            .unsigned()
            .primary();
        table.float('fold_change', 16, 8)
            .notNullable();
        table.float('log_odds', 16, 8)
            .notNullable();
        table.string('p_value')
            .notNullable();
        table.string('fdr')
            .notNullable();
        table.float('avg_expr', 16, 8)
            .notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('analysis');
};
