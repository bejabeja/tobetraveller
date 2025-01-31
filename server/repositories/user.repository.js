import client from '../database/database.js';

async function getUserBy(userId) {
    const { rows } = await client.query(
        'SELECT * FROM users WHERE id = $1', [userId]
    );
    return rows[0]
}

async function getUserByUsername(username) {
    const { rows } = await client.query(
        'SELECT * FROM users WHERE username=$1',
        [username]
    );

    return rows[0]
}


async function createNewUser(email, username, hashedPassword) {
    await client.query('INSERT INTO users (email, username, password) VALUES ($1, $2, $3)', [email, username, hashedPassword]);
}

export { createNewUser, getUserBy, getUserByUsername };
