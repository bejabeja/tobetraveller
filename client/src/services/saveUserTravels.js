export default function saveUserTravels(userTravel, userId) {
    return fetch(`${process.env.REACT_APP_API_URL}/user-travels`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userTravel,
            userId
        })
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to save user travel');
            }
            return res.json();
        })
        .then(res => {
            if (!res.body.userTravels) {
                throw new Error('Response does not contain favorite cities');
            }
            return res.body.userTravels
        })
}