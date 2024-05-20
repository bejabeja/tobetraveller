const { jsonResponse } = require('../lib/jsonResponse');

const router = require('express').Router();
const client = require('./database');

router.post('/', async (req, res) => {
    try {
        // Extract data from body
        const { city_id, user_id } = req.body;
        
        // user exist?
        const userExists = await client.query('SELECT 1 FROM users WHERE user_id = $1', [user_id]);
        if (userExists.rows.length === 0) {
            return res.status(404).json(
                jsonResponse(
                    404,
                    { message: 'User not found' }
                )
            );
        }

        // city on list?
        const existingFavoriteCities = await client.query(
            'SELECT favorite_cities FROM users WHERE user_id = $1',
            [user_id]
        );
        const favoriteCities = existingFavoriteCities.rows[0].favorite_cities;
        if (favoriteCities.includes(city_id)) {
            return res.status(400).json(
                jsonResponse(
                    400,
                    { message: 'City already exists in favorite cities' }
                )
            );
        }

        // update data on ddbb
        await client.query(
            'UPDATE users SET favorite_cities = array_append(favorite_cities, $1) WHERE user_id = $2',
            [city_id, user_id]
        );

        //send response
        return res.status(201).json(
            jsonResponse(
                201,
                { message: 'Favorite city added successfully' }
            )
        );
    } catch (error) {
        console.error('Error adding favorite city:', error.message);
        return res.status(500).json(
            jsonResponse(
                500,
                { message: 'Internal server error' }
            )
        );
    }
});

module.exports = router