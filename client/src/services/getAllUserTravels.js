export default function getTravels(userId) {
    return fetch(`${process.env.REACT_APP_API_URL}/planned-travels?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (!res.ok) throw new Error('Response get User Travels is not ok');
            return res.json();
        })
        .then(res => {
            const userTravels = res.body;
            return userTravels
        })
}