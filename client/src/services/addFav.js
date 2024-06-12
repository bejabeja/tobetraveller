export default function addFav({ city_id }, user_id) {
    return fetch(`${process.env.REACT_APP_API_URL}/favs`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            city_id,
            user_id
        })
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to add favorite city');
            }
            return res.json();
        })
        .then(res => {
            if (!res.body.favs) {
                throw new Error('Response does not contain favorite cities');
            }
            return res.body.favs;
        })
}