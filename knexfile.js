const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    development: {
        client: "postgresql",
        connection: process.env.PG_CONNECTION_STRING,
        migrations: {
            tableName: "_migration",
            stub: "./scripts/migration.template.js"
        }
    },

    production: {
        client: "postgresql",
        connection: process.env.PG_CONNECTION_STRING,
        migrations: {
            tableName: "_migration",
            stub: "./scripts/migration.template.js"
        }
    }
}
