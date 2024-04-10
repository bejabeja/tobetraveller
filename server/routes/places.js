const { jsonResponse } = require('../lib/jsonResponse');

const router = require('express').Router();

const citiesData = require('../mocks/cities.json')

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
                { error: 'Place not found' }
            )
        )
    }

    res.send(city);
})




module.exports = router