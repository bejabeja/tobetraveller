import client from '../config/database.js';

async function getAllCities() {
    const { rows } = await client.query('SELECT * FROM CITIES')
    return rows;
}


async function getCityById(id) {

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

        if (res.rows.length === 0) {
            return null; // No se encontró ninguna ciudad con el ID proporcionado
        }

        const cityInfo = {
            id: res.rows[0].city_id,
            cityName: res.rows[0].city_name,
            countryName: res.rows[0].country_name,
            countryCode: res.rows[0].country_code,
            countryDescription: res.rows[0].country_description,
            currency: res.rows[0].currency,
            cityDescription: res.rows[0].city_description,
            cityThumbnail: res.rows[0].city_thumbnail,
        };

        const pointsOfInterest = res.rows
            .filter(row => row.poi_id !== null) // Excluye filas sin POI
            .map(row => ({
                id: row.poi_id,
                name: row.poi_name,
                type: row.poi_type,
                description: row.poi_description,
                openingHours: row.poi_opening_hours,
                thumbnail: row.poi_thumbnail,
            }));

        return { cityInfo, pointsOfInterest };
    } catch (err) {
        console.error('Error ejecutando la consulta', err.stack);
        throw err;
    }
}

export { getCityById, getAllCities };