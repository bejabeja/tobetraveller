import { jsonResponse } from '../utils/jsonResponse.js';
import express from 'express';
const router = express.Router();
import { getUserBy, updateUserFavs, getUserFavs, getAllFavsInfoFromUser } from '../repositories/userRepository.js';
import { INTERNAL_SERVER_ERROR, USER_NOT_FOUND } from '../utils/constantsErrors.js';

router.get('/', async (req, res) => {
    try {
        const { user_id } = req.query;
        const favsCities = await getAllFavsInfoFromUser(user_id);
        if (favsCities) {

            return res.status(200).json(
                jsonResponse(
                    200,
                    { favs: favsCities }
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
                { message: INTERNAL_SERVER_ERROR }
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
                jsonResponse(404, { message: USER_NOT_FOUND })
            );
        }


        if (user.favorite_cities.includes(city_id)) {
            return res.status(400).json(
                jsonResponse(400, { message: 'City already exists in favorite cities' })
            );
        }

        // TODO: need a refactor, change column favs array to arrayofobjects
        const updatedCities = [...user.favorite_cities, city_id];
        await updateUserFavs(updatedCities, user_id)
        const allUserFavs = await getAllFavsInfoFromUser(user_id)


        return res.status(201).json(
            jsonResponse(201, { favs: allUserFavs })
        );

    } catch (error) {
        console.error('Error adding favorite city:', error.message);
        return res.status(500).json(
            jsonResponse(500, { message: INTERNAL_SERVER_ERROR })
        );
    }
});

router.delete('/', async (req, res) => {
    try {
        const { city_id, user_id } = req.body;

        const favoriteCities = await getUserFavs(user_id);
        const updatedCities = favoriteCities.filter(id => id !== city_id);

        await updateUserFavs(updatedCities, user_id);
        const allUserFavs = await getAllFavsInfoFromUser(user_id)

        return res.status(200).json(
            jsonResponse(200, { favs: allUserFavs })
        );

    } catch (error) {
        console.error('Error deleting favorite city:', error.message);
        return res.status(500).json(
            jsonResponse(500, { message: INTERNAL_SERVER_ERROR })
        );
    }
});

export default router;