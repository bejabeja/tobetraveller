import express from 'express';
import { jsonResponse } from '../utils/jsonResponse.js';
import { getAllCities, getCityById } from '../repositories/citiesRepository.js';

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

        return res.status(200).json(
            jsonResponse(
                500,
                { message: INTERNAL_SERVER_ERROR }
            )
        );
    }
})

router.get('/:id', (req, res) => {
    const cityId = parseInt(req.params.id)
    const city = getCityById(cityId)

    if (!city) {
        return res.status(404).json(
            jsonResponse(
                404,
                { error: 'City not found' }
            )
        )
    }

    res.send(city);
})

export default router;