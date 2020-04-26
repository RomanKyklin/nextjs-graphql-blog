exports.up = function (knex) {
    return knex.schema.createTable('posts', function (table) {
        table.increments('id');
        table.string('title', 255).notNullable();
        table.string('text').notNullable();
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('posts');
};
