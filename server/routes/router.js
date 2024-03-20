const express = require('express');
const router = express.Router();
const { jsonResponse } = require('../lib/jsonResponse');

router.post('/signup', (req, res) => {
    const { username, name, password } = req.body;
    if (!username || !name || !password) {
        return res.status(400).json(
            jsonResponse(
                400,
                { error: "Fields are required" }
            )
        );
    }
    res.status(200).json(
        jsonResponse(
            200,
            { message: "User created successfully" }
        )
    );
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json(
            jsonResponse(
                400,
                { error: "Fields are required" }
            )
        )
    }

    const accesToken = "acces_token";
    const refreshToken = "refresh_token";
    const user = {
        id: '1',
        name: 'Mimi',
        username: 'mirabaix'
    }


    res.status(200).json(
        jsonResponse(
            200,
            { user, accesToken, refreshToken }
        )
    )

});

router.get('/user', (req, res) => {
    res.send('Hello world');
});

router.get('/refresh-token', (req, res) => {
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