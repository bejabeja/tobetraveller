import { DATA_NOT_FOUND, INTERNAL_SERVER_ERROR, USER_PASSWORD_INCORRECT } from "../utils/constantsErrors.js";
import { jsonResponse } from "../utils/jsonResponse.js";

export default class FavsController {
    constructor(favsService) {
        this.favsService = favsService;
    }

    async getFavs(req, res) {
        try {
            const { userId } = req.query;

            if (!userId) {
                return res.status(400).json(jsonResponse(400, { message: USER_PASSWORD_INCORRECT }));
            }

            const favsCities = await this.favsService.getCityInfoFavsUser(userId);
            return res.status(200).json(jsonResponse(200, { favs: favsCities }));

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

    async saveFav(req, res) {
        try {
            const { city_id, userId } = req.body;
            if (!userId || !city_id) {
                return res.status(404).json(
                    jsonResponse(404, { message: DATA_NOT_FOUND })
                );
            }

            const allUserFavs = await this.favsService.saveFav(city_id, userId);
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

    async removeFav(req, res) {
        try {
            const { city_id, userId } = req.body;
            if (!userId || !city_id) {
                return res.status(404).json(
                    jsonResponse(404, { message: DATA_NOT_FOUND })
                );
            }
            const allUserFavs = await this.favsService.removeFav(city_id, userId);

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
}