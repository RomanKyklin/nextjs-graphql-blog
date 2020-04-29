export async function up(knex) {
    await knex.raw(`
        CREATE TABLE post (
            id SERIAL PRIMARY KEY,
            title varchar(255) NOT NULL,
            text text NOT NULL,
            user_id integer,
            foreign key (user_id) references users (id)
        ); 
    `);
};

export async function down(knex) {
    await knex.raw(`DROP TABLE post;`);
};
