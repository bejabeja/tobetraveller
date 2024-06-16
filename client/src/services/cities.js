const CITIES_ENDPOINT = `${process.env.REACT_APP_API_URL}/cities`;

export const getCities = async () => {
    const res = await fetch(CITIES_ENDPOINT)
    const cities = await res.json()
    return cities
}

export const getCity = async (id) => {
    const res = await fetch(`${CITIES_ENDPOINT}/${id}`)
    const city = await res.json()
    return city
}