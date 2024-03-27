import React from "react";
import { useAuth } from "../auth/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const SignoutLink = ({ children }) => {
    const auth = useAuth();
    const navigate = useNavigate()

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
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Link to='/login' onClick={handleSignout} > {children} </Link>
    )
};

export default SignoutLink;
