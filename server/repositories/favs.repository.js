import client from '../database/database.js';
import FavsInterface from '../domain/interfaces/favs.interface.js';

export default class FavsRepository extends FavsInterface {

    async getUserFavs(userId) {
        const { rows } = await client.query(
            'SELECT favorite_cities FROM users WHERE id = $1', [userId]
        );
        if (rows.length === 0) return [];


        return rows[0].favorite_cities;
    }

    async updateUserFavs(updatedCities, userId) {
        await client.query(
            'UPDATE users SET favorite_cities = $1 WHERE id = $2',
            [updatedCities, userId]
        );
    }

    async getAllFavsInfoFromUser(userId) {
        const userFavs = await this.getUserFavs(userId)
        if (userFavs.length === 0) return [];

        const { rows } = await client.query(
            'SELECT * FROM cities WHERE id = ANY($1)', [userFavs]
        );

        return rows;
    }
}