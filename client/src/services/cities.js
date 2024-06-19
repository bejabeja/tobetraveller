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
    return fetch(`${CITIES_ENDPOINT}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (!res.ok) throw new Error('Response get city is not ok');
            return res.json();
        })
        .then(res => {
            const city = res.body;
            return city;
        });
}