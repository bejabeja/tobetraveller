const express = require('express');
const router = express.Router();

router.get('/user', (req, res) => {
    res.send('Hello world');
});

router.get('/signout', (req, res) => {
    res.send('Hello world');
});


router.get('/places', (req, res) => {
    const placesData =
        [
            {
                "id": 1,
                "cityName": 'Gold Coast',
                "countryName": 'Australia',
                "countryCode": 'au',
                "countryText": 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. '
            },
            {
                "id": 2,
                "cityName": 'Barcelona',
                "countryName": 'Spain',
                "countryCode": 'es',
                "countryText": 'Lorem Ipsum  '
            },
            {
                "id": 3,
                "cityName": 'Sidney',
                "countryName": 'Australia',
                "countryCode": 'au',
                "countryText": 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. '
            },
            {
                "id": 4,
                "cityName": 'Zurich',
                "countryName": 'Switzerland',
                "countryCode": 'ch',
                "countryText": 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. '
            }
        ]

    res.send(placesData)
})

module.exports = router