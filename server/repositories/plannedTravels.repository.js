import client from "../database/database.js";


export default class PlannedTravelsRepository {

    async getAllUserTravelsBy(userId) {
        const { rows } = await client.query(
            'SELECT * FROM user_travels WHERE user_id = $1', [userId]
        )

        return rows;
    }

    async saveUserTravels(userTravel) {
        const { destination, travelDays, thumbnail, itinerary, userId } = userTravel
        await client.query(
            'INSERT INTO user_travels(itinerary, title, days, user_id, thumbnail) VALUES($1, $2, $3, $4, $5)',
            [itinerary, destination, travelDays, userId, thumbnail]
        )
    }
}

