import env from 'dotenv';
import knex from "knex";

env.config();

export const knexClient = knex({
    client: "postgres",
    connection: process.env.PG_CONNECTION_STRING,
    pool: {min: 1, max: 1, idleTimeoutMillis: 5000},
});

