export default function getTravels(userId) {
    return fetch(`${process.env.REACT_APP_API_URL}/user-travels?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (!res.ok) throw new Error('Response get Travels is not ok');
            return res.json();
        })
        .then(res => {
            const travels = res.body;
            console.log(travels)

            return travels
        })
}