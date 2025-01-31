import { getUserBy } from "../repositories/user.repository.js";

export default class FavsService {
    constructor(favsRepository) {
        this.favsRepository = favsRepository;
        // this.userRepository = userRepository;
    }


    async getCityInfoFavsUser(userId) {
        const favs = await this.favsRepository.getCityInfoFavsUser(userId);
        if (!favs) {
            return [];
        }

        return favs;
    }

    async saveFav(cityId, userId) {
        const user = await getUserBy(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const favoriteCities = Array.isArray(user.favorite_cities) ? user.favorite_cities : [];
        if (favoriteCities.includes(cityId)) {
            throw new Error('City already exists in favorite cities');
        }

        // TODO: need a refactor, change column favs array to arrayofobjects
        const updatedCities = [...favoriteCities, cityId];
        await this.favsRepository.updateUserFavs(updatedCities, userId)

        return await this.favsRepository.getCityInfoFavsUser(userId);
    }

    async removeFav(cityId, userId) {
        const favoriteCities = await this.favsRepository.getUserFavs(userId);

        if (!Array.isArray(favoriteCities) || favoriteCities.length === 0) {
            throw new Error('No favorite cities found');
        }
        const updatedCities = favoriteCities.filter(id => id !== cityId);

        await this.favsRepository.updateUserFavs(updatedCities, userId);
        return await this.favsRepository.getCityInfoFavsUser(userId)
    }
}