import PlannedTravel from '../domain/entities/PlannedTravel.js';
import { getUserBy } from '../repositories/user.repository.js';

export default class PlannedTravelsService {
    constructor(plannedTravelsRepository, userRepository) {
        this.plannedTravelsRepository = plannedTravelsRepository;
        this.userRepository = userRepository
    }

    async getPlannedTravelsBy(userId) {
        const rawPlannedTravel = await this.plannedTravelsRepository.getAllUserTravelsBy(userId);
        return rawPlannedTravel.map(plannedTravel => {
            return new PlannedTravel(
                plannedTravel.id,
                plannedTravel.user_id,
                plannedTravel.title,
                plannedTravel.days,
                plannedTravel.thumbnail,
                plannedTravel.itinerary,
                plannedTravel.created_at
            )
        })
    }

    async savePlannedTravel(rawPlannedTravel, userId) {

        const user = await getUserBy(userId);
        if (!user) {
            throw new Error(USER_PASSWORD_INCORRECT);
        }
        const plannedTravel = new PlannedTravel(
            null,
            userId,
            rawPlannedTravel.destination,
            rawPlannedTravel.travelDays,
            rawPlannedTravel.thumbnail,
            rawPlannedTravel.itinerary
        );
        return await this.plannedTravelsRepository.saveUserTravels(plannedTravel);
    }
}