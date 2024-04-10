const PLACES_ENDPOINT = `${process.env.REACT_APP_API_URL}/places`;

export const getPlaces = async () => {
    const res = await fetch(PLACES_ENDPOINT)
    const { cities } = await res.json()
    return cities
}

export const getCity = async (id) => {
    const res = await fetch(`${PLACES_ENDPOINT}/${id}`)
    const city = await res.json()
    return city
}