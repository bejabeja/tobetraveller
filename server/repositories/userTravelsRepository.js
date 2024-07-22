import client from "../config/database.js";

async function getAllUserTravelsBy(userId) {
    const { rows } = await client.query(
        'SELECT * FROM user_travels WHERE user_id = $1', [userId]
    )

    return rows;
}

async function saveUserTravels(userTravel, userId) {
    const { destination, travelDays, headerImg, itinerary } = userTravel
    await client.query(
        'INSERT INTO user_travels(itinerary, title, days, user_id, thumbnail) VALUES($1, $2, $3, $4, $5)',
        [itinerary, destination, travelDays, userId, headerImg]
    )
}

export { getAllUserTravelsBy, saveUserTravels };