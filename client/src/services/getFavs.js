const FAVS_API = `${process.env.REACT_APP_API_URL}/favs`

export default function getFavs({ user_id }) {
    return fetch(`${FAVS_API}?user_id=${user_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (!res.ok) throw new Error('Response get favs is not ok');
            return res.json();
        })
        .then(res => {
            const { favs } = res.body;
            return favs;
        });
}