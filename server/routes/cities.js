import express from 'express';
import { jsonResponse } from '../utils/jsonResponse.js';
import { getAllCities, getCityById } from '../repositories/citiesRepository.js';
import { INTERNAL_SERVER_ERROR } from '../utils/constantsErrors.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const cities = await getAllCities()

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
})

router.get('/:id', async (req, res) => {
    const cityId = parseInt(req.params.id)

    try {
        const city = await getCityById(cityId)
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
})

export default router;