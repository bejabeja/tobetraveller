import City from "../domain/entities/City.js";
import PointOfInterest from "../domain/entities/PointOfInterest.js";

export default class CitiesService {
    constructor(citiesRepository) {
        this.citiesRepository = citiesRepository;
    }

    async getCities() {
        const cities = await this.citiesRepository.getCities();

        const citiesMapped = cities.map(city => new City(
            city.id,
            city.city_name,
            city.country_name,
            city.country_code,
            city.country_description,
            city.currency,
            city.city_thumbnail)
        );
        return citiesMapped;
    }

    async getCityBy(id) {
        const cityData = await this.citiesRepository.getCityBy(id);

        if (cityData.length === 0) {
            return null; // No ciudad con el ID  
        }

        const city = new City(
            cityData[0].id,
            cityData[0].city_name,
            cityData[0].country_name,
            cityData[0].country_code,
            cityData[0].country_description,
            cityData[0].currency,
            cityData[0].city_thumbnail
        );

        const pointsOfInterest = cityData
            .filter(row => row.poi_id !== null) // Filtramos las filas que tienen POIs
            .map(row => new PointOfInterest(
                row.poi_id,
                row.poi_name,
                row.poi_type,
                row.poi_description,
                row.poi_opening_hours,
                row.poi_thumbnail
            ));

        city.pointsOfInterest = pointsOfInterest;
        return city;
    }
}