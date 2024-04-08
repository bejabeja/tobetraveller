const PLACES_ENDPOINT = `${process.env.REACT_APP_API_URL}/places`;

export const getPlaces = async () => {
    const res = await fetch(PLACES_ENDPOINT)
    const data = await res.json()
    return data
}