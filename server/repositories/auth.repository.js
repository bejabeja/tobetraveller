import client from '../database/database.js';


async function setToken(token) {
    await client.query('INSERT INTO tokens (refresh_token) VALUES ($1)', [token]);
}

async function removeToken(token) {
    await client.query('DELETE FROM tokens WHERE refresh_token = $1', [token])
}

async function getAllTokensBy(token) {
    const { rows } = await client.query('SELECT * FROM tokens WHERE refresh_token=$1', [token])
    return rows[0];
}



export { getAllTokensBy, removeToken, setToken };

