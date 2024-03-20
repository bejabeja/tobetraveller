const { Pool } = require('pg');
require('dotenv/config');

const client = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

client.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch(error => console.error('Error connecting to PostgreSQL database:', error));

module.exports = client;