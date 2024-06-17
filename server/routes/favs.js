import { jsonResponse } from '../lib/jsonResponse.js';
import express from 'express';
const router = express.Router();
import { getUserBy, updateUserFavs, getUserFavs } from '../repositories/userRepository.js';

router.get('/', async (req, res) => {
    try {
        const { user_id } = req.query;
        const user = await getUserBy(user_id);
        // user exists and has favorite cities
        if (user.length > 0) {
            const favoriteCities = user[0].favorite_cities;
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

        const user = await getUserBy(user_id);
        if (!user) {
            return res.status(404).json(
                jsonResponse(404, { message: 'User not found' })
            );
        }


        if (user.favorite_cities.includes(city_id)) {
            return res.status(400).json(
                jsonResponse(400, { message: 'City already exists in favorite cities' })
            );
        }

        const updatedCities = [...user.favorite_cities, city_id];
        await updateUserFavs(updatedCities, user_id)

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

        const favoriteCities = await getUserFavs(user_id);
        const updatedCities = favoriteCities.filter(id => id !== city_id);

        await updateUserFavs(updatedCities, user_id);

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

export default router;