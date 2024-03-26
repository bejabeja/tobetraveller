import React from "react";
import { useAuth } from "../auth/AuthProvider";
import ButtonLink from "./ButtonLink";
import { useNavigate } from "react-router-dom";

const SignoutButton = () => {
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
        <ButtonLink onClick={handleSignout} text='Signout' className='primary-button' />
    )
};

export default SignoutButton;
