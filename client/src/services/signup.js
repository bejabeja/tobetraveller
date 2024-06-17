export default function signup(username, email, password) {
    return fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username, email, password
        })
    })
        .then(res => {
            if (!res.ok) {
                return res.json().then(err => {
                    throw new Error(err.body.error);
                });
            }
            return res.json();
        })
        .then(res => {
            if (!res.body) {
                throw new Error(res.body.error);
            }
            return res;
        })
}