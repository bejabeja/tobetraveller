import client from "../database/database.js";

export async function getCitiesRepo() {
    const { rows } = await client.query('SELECT * FROM CITIES')
    return rows;
}


export async function getCityByRepo(id) {

    try {
        const res = await client.query(
            `SELECT 
                c.id AS city_id,
                c.city_name,
                c.country_name,
                c.country_code,
                c.country_description,
                c.currency,
                c.city_description,
                c.city_thumbnail,
                poi.id AS poi_id,
                poi.name AS poi_name,
                poi.type AS poi_type,
                poi.description AS poi_description,
                poi.opening_hours AS poi_opening_hours,
                poi.thumbnail AS poi_thumbnail
            FROM 
                cities c
            LEFT JOIN 
                points_of_interest poi ON c.id = poi.city_id
            WHERE 
                c.id = $1;
        `, [id]
        );

        return res.rows;
    } catch (err) {
        console.error('Error ejecutando la consulta', err.stack);
        throw err;
    }
}
