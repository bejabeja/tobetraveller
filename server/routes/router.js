const express = require('express')
const router = express.Router()

router.get('/places', (req, res) => {
    const placesData = 
        [
            {
                "id": 1,
                "cityName": 'Gold Coast',
                "countryName": 'Australia',
            },
            {
                "id": 2,
                "cityName": 'Melbourne',
                "countryName": 'Australia',
            },
            {
                "id": 3,
                "cityName": 'Sidney',
                "countryName": 'Australia',
            }
        ]
    
    res.send(placesData)
})

module.exports = router