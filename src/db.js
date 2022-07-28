const { Client } = require('pg');

const client = new Client({
    user: '',
    host: '',
    database: '',
    password: '',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

module.exports = client;