import { INTERNAL_SERVER_ERROR } from "../utils/constantsErrors.js";
import { jsonResponse } from "../utils/jsonResponse.js";

export default class CitiesController {
    constructor(citiesService) {
        this.citiesService = citiesService;
    }

    async getAllCities(req, res) {
        try {
            const cities = await this.citiesService.getCities()
            const citiesJSON = cities.map(city => city.toJSON());

            console.log(citiesJSON);
            return res.status(200).json(
                jsonResponse(
                    200,
                    citiesJSON
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

    async getCity(req, res) {
        const cityId = parseInt(req.params.id)

        try {
            const city = await this.citiesService.getCityBy(cityId)
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
                    city.toJSON()
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
}
