const CITIES_ENDPOINT = `${process.env.REACT_APP_API_URL}/cities`;

export const getAllCities = async () => {
    return fetch(CITIES_ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (!res.ok) throw new Error('Response get cities is not ok');
            return res.json();
        })
        .then(res => {
            const cities = res.body;
            return cities;
        });
}

export const getCity = async (id) => {
    const res = await fetch(`${CITIES_ENDPOINT}/${id}`)
    const city = await res.json()
    return city
}