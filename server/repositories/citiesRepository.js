import citiesData from '../mocks/cities.json' assert { type: 'json' };
import client from '../config/database.js';

async function getAllCities() {
    const { rows } = await client.query('SELECT * FROM CITIES')
    return rows;
}


function getCityById(id) {
    const city = citiesData.cities.find((city) => city.id === id)
    return city
}

export { getCityById, getAllCities };