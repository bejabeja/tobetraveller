import { getUserBy } from "../repositories/user.repository.js";

export default class FavsService {
    constructor(favsRepository) {
        this.favsRepository = favsRepository;
        // this.userRepository = userRepository;
    }


    async getAllFavsInfoFromUser(userId) {
        const favs = await this.favsRepository.getAllFavsInfoFromUser(userId);
        if (!favs) {
            return [];
        }

        return favs;
    }

    async saveFav(city_id, userId) {
        const user = await getUserBy(userId);
        if (!user) {
            throw new Error('User not found');
        }
        if (user.favorite_cities.includes(city_id)) {
            throw new Error('City already exists in favorite cities');
        }

        // TODO: need a refactor, change column favs array to arrayofobjects
        const updatedCities = [...user.favorite_cities, city_id];
        await this.favsRepository.updateUserFavs(updatedCities, userId)
        const allUserFavs = await this.favsRepository.getAllFavsInfoFromUser(userId)

        return allUserFavs;
    }

    async removeFav(city_id, userId) {
        const favoriteCities = await this.favsRepository.getUserFavs(userId);

        if (!favoriteCities || favoriteCities.length === 0) {
            throw new Error('No favorite cities found');
        }
        const updatedCities = favoriteCities.filter(id => id !== city_id);

        await this.favsRepository.updateUserFavs(updatedCities, userId);
        const allUserFavs = await this.favsRepository.getAllFavsInfoFromUser(userId)
        return allUserFavs
    }
}