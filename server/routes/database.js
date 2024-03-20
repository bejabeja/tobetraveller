const { Pool } = require('pg');
require('dotenv/config');

const client = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

client.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch(error => console.error('Error connecting to PostgreSQL database:', error));

async function createUsersTable() {
    try {
        await client.connect();
        const query = `
                CREATE TABLE IF NOT EXISTS users (
                    user_id SERIAL PRIMARY KEY, 
                    name VARCHAR(255), 
                    username VARCHAR(255) UNIQUE, 
                    password VARCHAR(255)
                )
              `;


        await client.query(query);
        console.log('Table "users" created successfully');
    } catch (error) {
        console.error('Error creating users table:', error);
    } 
}


createUsersTable();


async function createTokensTable() {
    try {
        await client.connect();
        const query = `
            CREATE TABLE IF NOT EXISTS tokens (
              id SERIAL PRIMARY KEY,
              refresh_token TEXT NOT NULL,
              created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            )
          `;

        await client.query(query);
        console.log('Table "tokens" created successfully');
    } catch (error) {
        console.error('Error creating tokens table:', error);
    } 
}


createTokensTable();


module.exports = client;