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
                return res.json().then(data => {
                    console.log(data);
                    throw new Error(data.body.error || 'Error login. Please try again.');
                });
            }
            return res.json();
        })
        .then(res => {
            if (!res.body.accesToken && !res.body.refreshToken) {
                throw new Error('Invalid response from server. Please try again.');
            }
            return res;
        })
        .catch(error => {
            console.error('Error occurred:', error.message);
            throw error;
        });
}