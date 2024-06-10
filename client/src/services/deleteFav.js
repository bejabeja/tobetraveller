const FAVS_API = `${process.env.REACT_APP_API_URL}/favs`


export default function deleteFav({ city_id, user_id }) {
    return fetch(FAVS_API, {
        method: 'DELETE',
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
                throw new Error('Response delete fav is not ok');
            }
            return res.json();
        })
        .then(res => res.body.favs);
}

