export default function login(username, password) {
    return fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Error during login. Please try again.');
            }
            return res.json();
        })
        .then(res => {
            if (!res.body.accesToken && !res.body.refreshToken) {
                throw new Error('Invalid response from server. Please try again.');
            }
            return res;
        })
}