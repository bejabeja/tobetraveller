import client from "../config/database";

async function getAllUserTravelsBy(userId) {
    const { rows } = await client.query(
        'SELECT * FROM user_travels WHERE user_id = $1', [userId]
    )

    return rows;
}

export { getAllUserTravelsBy };