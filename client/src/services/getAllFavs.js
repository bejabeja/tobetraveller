export default function getFavs(userId) {
    return fetch(`${process.env.REACT_APP_API_URL}/favs?userId=${userId}`, {
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