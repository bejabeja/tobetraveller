import express from 'express';
import axios from 'axios'
import { jsonResponse } from '../utils/jsonResponse.js';
import { INTERNAL_SERVER_ERROR } from '../utils/constantsErrors.js';

const router = express.Router();
const API_KEY = process.env.API_KEY
const API_URL_FOURSQUARE = `https://api.foursquare.com/v3/places/search`;

// test: http://localhost:3001/api/itinerario?city=Barcelona&days=3
// https://www.postman.com/foursquareapis/foursquare-places-api-v3-public/request/drws80w/get-place-photos

router.get('/', async (req, res) => {
    const city = req.query.city;
    const days = parseInt(req.query.days);

    if (!city || isNaN(days) || days <= 0) {
        return res.status(400).json(
            { error: 'City and days params are required, and days must be a positive number.' }
        );
    }

    try {
        const { lat, lon } = await obtainCoordinates(city);
        const places = await obtainPopularPlaces(lat, lon);
        const itinerary = createItinerary(places, days);
        res.json(itinerary);
    } catch (error) {
        console.error('Error retrieving places:', error);
        res.status(500).json({ error: 'Error retrieving places' });
    }
});

const obtainCoordinates = async (city) => {
    const API_URL_NOMINATIM = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&addressdetails=1`;
    const response = await axios.get(API_URL_NOMINATIM);
    const { lat, lon } = response.data[0];
    return { lat, lon };
};

const obtainPopularPlaces = async (lat, lon) => {
    //check categories https://docs.foursquare.com/data-products/docs/categories
    const categories = [
        '16000',
    ].join(',');

    const params = {
        ll: `${lat},${lon}`,
        radius: 10000,
        limit: 20,
        categories: categories
    };
    const response = await axios.get(API_URL_FOURSQUARE, {
        headers: {
            'Authorization': API_KEY,
        },
        params,
    });

    return response.data.results;
};

// Crear un itinerario dividiendo los places entre los días
const createItinerary = (places, days) => {
    const itinerary = {};
    const placesPerDay = Math.floor(places.length / days);
    const extra = places.length % days;

    for (let day = 1; day <= days; day++) {
        const inicio = (day - 1) * placesPerDay + Math.min(day - 1, extra);
        const fin = inicio + placesPerDay + (day <= extra ? 1 : 0);
        itinerary[`Day ${day}`] = places.slice(inicio, fin).map(place => place.name);
    }

    return itinerary;
};

export default router;