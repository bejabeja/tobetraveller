import client from '../database/database.js';


export default class AuthRepository {
    async setToken(token) {
        await client.query('INSERT INTO tokens (refresh_token) VALUES ($1)', [token]);
    }

    async removeToken(token) {
        await client.query('DELETE FROM tokens WHERE refresh_token = $1', [token])
    }

    async getAllTokensBy(token) {
        const { rows } = await client.query('SELECT * FROM tokens WHERE refresh_token=$1', [token])
        return rows[0];
    }
}

