import citiesData from '../mocks/cities.json' assert { type: 'json' };

function getAllCities() {
    return citiesData.cities
}

function getCityById(id) {
    const city = citiesData.cities.find((city) => city.id === id)
    return city
}

export { getCityById, getAllCities };