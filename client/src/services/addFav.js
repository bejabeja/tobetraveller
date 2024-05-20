export default function addFav({ city_id, user_id }) {
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
            if (!res.ok) throw new Error('Response add fav is not ok');
            return res.json();
        })
        .then(res => {
            const { favs } = res;
            return favs;
        });
}