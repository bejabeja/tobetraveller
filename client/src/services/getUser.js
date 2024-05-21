export default async function getUser(accessToken) {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })

        if (response.ok) {
            const json = await response.json()
            if (json.error) {
                throw new Error(json.error)
            }
            return json.body
        } else {
            throw new Error(response.statusText)
        }

    } catch (error) {
        console.log(error)
        return null
    }
}