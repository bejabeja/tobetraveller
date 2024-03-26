import React, { useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import './Login.css'
import { useAuth } from '../auth/AuthProvider';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorResponse, setErrorResponse] = useState('')

    const auth = useAuth()
    const goTo = useNavigate()
    const { state } = useLocation()

    if (auth.isAuthenticated) {
        return <Navigate to='/'></Navigate>
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })

            if (response.ok) {
                console.log("Login succesful")
                setErrorResponse('')
                const json = await response.json()
                console.log(json)

                if (json.body.accesToken && json.body.refreshToken) {
                    auth.saveUser(json)
                    goTo(state?.pathname ?? '/')
                }

            } else {
                console.log("Something went wrong")
                const json = await response.json()
                setErrorResponse(json.body.error)
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <DashboardLayout>
            <form onSubmit={handleLogin} className='section--loggin'>
                {errorResponse && <div className='errorMessage'>{errorResponse}</div>}

                <h1>Login</h1>
                <label>Username</label>
                <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}></input>

                <label>Password</label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>

                <button >Login</button>
            </form>
        </DashboardLayout>
    );
};

export default Login;