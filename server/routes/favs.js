const { jsonResponse } = require('../lib/jsonResponse');
const router = require('express').Router();
const client = require('./database');

router.get('/', async (req, res) => {
    console.log('API GETFAVS: ', req.query.user_id)

    try {
        const { user_id } = req.query;
        const { rows } = await client.query(
            'SELECT * FROM users WHERE user_id = $1', [user_id]
        );
        console.log('Query Result: ', rows);
        // user exists and has favorite cities
        if (rows.length > 0 && rows[0].favorite_cities) {
            const favoriteCities = rows[0].favorite_cities;
            return res.status(200).json(
                jsonResponse(
                    200,
                    { favs: favoriteCities }
                )
            );
        } else {
            return res.status(200).json(
                jsonResponse(200, { favs: [] })
            );
        }

    } catch (error) {
        console.error('Error fetching favorite cities:', error.message);
        return res.status(500).json(
            jsonResponse(
                500,
                { message: 'Internal server error' }
            )
        );
    }
})


router.post('/', async (req, res) => {
    try {
        const { city_id, user_id } = req.body;

        const userExists = await client.query('SELECT 1 FROM users WHERE user_id = $1', [user_id]);
        if (userExists.rows.length === 0) {
            return res.status(404).json(
                jsonResponse(404, { message: 'User not found' })
            );
        }

        const { rows } = await client.query(
            'SELECT favorite_cities FROM users WHERE user_id = $1', [user_id]
        );

        const favoriteCities = rows[0].favorite_cities || [];
        if (favoriteCities.includes(city_id)) {
            return res.status(400).json(
                jsonResponse(400, { message: 'City already exists in favorite cities' })
            );
        }

        const updatedCities = [...favoriteCities, city_id];
        await client.query(
            'UPDATE users SET favorite_cities = $1 WHERE user_id = $2',
            [updatedCities, user_id]
        );

        return res.status(201).json(
            jsonResponse(201, { favs: updatedCities })
        );

    } catch (error) {
        console.error('Error adding favorite city:', error.message);
        return res.status(500).json(
            jsonResponse(500, { message: 'Internal server error' })
        );
    }
});

router.delete('/', async (req, res) => {
    try {
        const { city_id, user_id } = req.body;

        const { rows } = await client.query(
            'SELECT favorite_cities FROM users WHERE user_id = $1', [user_id]
        );

        const favoriteCities = rows[0].favorite_cities;
        const updatedCities = favoriteCities.filter(id => id !== city_id);

        await client.query(
            'UPDATE users SET favorite_cities = $1 WHERE user_id = $2',
            [updatedCities, user_id]
        );

        return res.status(200).json(
            jsonResponse(200, { favs: updatedCities })
        );

    } catch (error) {
        console.error('Error deleting favorite city:', error.message);
        return res.status(500).json(
            jsonResponse(500, { message: 'Internal server error' })
        );
    }
});


module.exports = router