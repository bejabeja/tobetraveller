import { getCities, getCityBy } from "../services/cities.service.js";
import { INTERNAL_SERVER_ERROR } from "../utils/constantsErrors.js";
import { jsonResponse } from "../utils/jsonResponse.js";

export const getAllCities = async (req, res) => {
    try {
        const cities = await getCities()

        return res.status(200).json(
            jsonResponse(
                200,
                cities
            )
        )
    } catch (error) {
        console.error('Error fetching cities:', error.message);

        return res.status(500).json(
            jsonResponse(
                500,
                { message: INTERNAL_SERVER_ERROR }
            )
        );
    }
}

export const getCity = async (req, res) => {
    const cityId = parseInt(req.params.id)

    try {
        const city = await getCityBy(cityId)
        if (!city) {
            return res.status(404).json(
                jsonResponse(
                    404,
                    { message: 'City not found' }
                )
            )
        }

        return res.status(200).json(
            jsonResponse(
                200,
                city
            )
        )

    } catch (error) {
        return res.status(500).json(
            jsonResponse(
                500,
                { message: INTERNAL_SERVER_ERROR }
            )
        )
    }
}