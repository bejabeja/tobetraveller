import express from 'express';
import { jsonResponse } from '../utils/jsonResponse.js';
import { getAllCities, getCityById } from '../repositories/citiesRepository.js';

const router = express.Router();

router.get('/', (req, res) => {
    const cities = getAllCities()
    res.send(cities);
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