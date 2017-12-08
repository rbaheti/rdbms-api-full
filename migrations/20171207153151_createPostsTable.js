exports.up = function(knex, Promise) {
    return knex.schema.createTable('posts', function(tbl) {
        tbl.increments('id'); // primary key
        // foreign key
        tbl
            .integer('userId')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE') // if a user's id is updated update this value
            .onDelete('CASCADE'); // if a user is deleted, delete her/his posts

        tbl.text('text').notNullable();
        tbl.timestamp('createdAt').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('posts');
};
