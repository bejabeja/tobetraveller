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

async function updateUserFavs(updatedCities, userId) {
    await client.query(
        'UPDATE users SET favorite_cities = $1 WHERE id = $2',
        [updatedCities, userId]
    );
}

async function getUserFavs(userId) {
    const { rows } = await client.query(
        'SELECT favorite_cities FROM users WHERE id = $1', [userId]
    );

    return rows[0].favorite_cities;
}

async function getAllFavsInfoFromUser(userId) {
    const userFavs = await getUserFavs(userId)
    const { rows } = await client.query(
        'SELECT * FROM cities WHERE id = ANY($1)', [userFavs]
    );

    return rows;
}

async function createNewUser(email, username, hashedPassword) {
    await client.query('INSERT INTO users (email, username, password) VALUES ($1, $2, $3)', [email, username, hashedPassword]);
}

export { createNewUser, getAllFavsInfoFromUser, getUserBy, getUserByUsername, getUserFavs, updateUserFavs };
