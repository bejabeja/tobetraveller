import React from "react";
import { useAuth } from "../auth/AuthProvider";

const Dashboard = () => {
    const auth = useAuth();

    async function handleSignout(e) {
        e.preventDefault()

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/signout`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.getRefreshToken()}`
                },
            })

            if (response.ok) {
                auth.signOut()
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <section className="section">
            <div>Dashboard de {auth.getUser()?.name || ''}</div>
            <a href="#" onClick={handleSignout}> Sign out</a>
        </section>
    )
};

export default Dashboard;
