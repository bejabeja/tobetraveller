import client from '../config/database.js';


async function getUserBy(user_id) {
    const { rows } = await client.query(
        'SELECT * FROM users WHERE user_id = $1', [user_id]
    );
    return rows[0]
}

async function updateUserFavs(updatedCities, user_id) {
    await client.query(
        'UPDATE users SET favorite_cities = $1 WHERE user_id = $2',
        [updatedCities, user_id]
    );
}

async function getUserFavs(user_id) {
    const { rows } = await client.query(
        'SELECT favorite_cities FROM users WHERE user_id = $1', [user_id]
    );

    return rows[0].favorite_cities;

}

export { getUserBy, updateUserFavs, getUserFavs };