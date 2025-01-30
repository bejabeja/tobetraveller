export default class CitiesService {
    constructor(citiesRepository) {
        this.citiesRepository = citiesRepository;
    }

    async getCities() {
        return await this.citiesRepository.getCities();
    }

    async getCityBy(id) {
        const city = await this.citiesRepository.getCityBy(id);
        if (city.length === 0) {
            return null; // No ciudad con el ID  
        }

        const cityInfo = {
            id: city[0].city_id,
            cityName: city[0].city_name,
            countryName: city[0].country_name,
            countryCode: city[0].country_code,
            countryDescription: city[0].country_description,
            currency: city[0].currency,
            cityDescription: city[0].city_description,
            cityThumbnail: city[0].city_thumbnail,
        };

        const pointsOfInterest = city
            .filter(row => row.poi_id !== null) // Excluye filas sin POI
            .map(row => ({
                id: row.poi_id,
                name: row.poi_name,
                type: row.poi_type,
                description: row.poi_description,
                openingHours: row.poi_opening_hours,
                thumbnail: row.poi_thumbnail,
            }));

        return {
            cityInfo,
            pointsOfInterest,
        };
    }
}