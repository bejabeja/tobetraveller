import express from 'express';
import { jsonResponse } from '../lib/jsonResponse.js';
import citiesData from '../mocks/cities.json' assert { type: 'json' };

const router = express.Router();

router.get('/', (req, res) => {
    res.send(citiesData);
})

router.get('/:id', (req, res) => {

    const cityId = parseInt(req.params.id)
    const city = citiesData.cities.find((city) => cityId === city.id)

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