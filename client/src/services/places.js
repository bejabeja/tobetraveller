const PLACES_ENDPOINT = `${process.env.REACT_APP_API_URL}/places`;

export const getPlaces = async () => {
    const res = await fetch(PLACES_ENDPOINT)
    const { cities } = await res.json()
    return cities
}