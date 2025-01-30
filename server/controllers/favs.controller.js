import { getAllFavsInfoFromUser, getUserBy, getUserFavs, updateUserFavs } from "../repositories/userRepository.js";
import { INTERNAL_SERVER_ERROR, USER_NOT_FOUND } from "../utils/constantsErrors.js";
import { jsonResponse } from "../utils/jsonResponse.js";

export const getFavs = async (req, res) => {
    try {
        const { userId } = req.query;
        const favsCities = await getAllFavsInfoFromUser(userId);
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
}


export const saveFav = async (req, res) => {
    try {
        const { city_id, userId } = req.body;

        const user = await getUserBy(userId);
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
        await updateUserFavs(updatedCities, userId)
        const allUserFavs = await getAllFavsInfoFromUser(userId)


        return res.status(201).json(
            jsonResponse(201, { favs: allUserFavs })
        );

    } catch (error) {
        console.error('Error adding favorite city:', error.message);
        return res.status(500).json(
            jsonResponse(500, { message: INTERNAL_SERVER_ERROR })
        );
    }
}

export const removeFav = async (req, res) => {
    try {
        const { city_id, userId } = req.body;

        const favoriteCities = await getUserFavs(userId);
        const updatedCities = favoriteCities.filter(id => id !== city_id);

        await updateUserFavs(updatedCities, userId);
        const allUserFavs = await getAllFavsInfoFromUser(userId)

        return res.status(200).json(
            jsonResponse(200, { favs: allUserFavs })
        );

    } catch (error) {
        console.error('Error deleting favorite city:', error.message);
        return res.status(500).json(
            jsonResponse(500, { message: INTERNAL_SERVER_ERROR })
        );
    }
}