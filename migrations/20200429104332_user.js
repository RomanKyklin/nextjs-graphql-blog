export async function up(knex) {
    await knex.raw(`
        CREATE TABLE users (
            id serial primary key,
            login varchar(255) NOT NULL,
            password text NOT NULL
        ); 
    `);
};

export async function down(knex) {
    await knex.raw(`DROP TABLE users;`);
};
