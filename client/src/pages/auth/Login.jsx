import React, { useState } from 'react';
import DashboardLayout from '../../layout/DashboardLayout';
import './Login.css'
import { useAuth } from '../../auth/AuthProvider';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import ButtonLink from '../../components/ButtonLink'

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
            <section className='section'>
                <form className='form--auth'>
                    <h1 className='form--auth__title'>Login</h1>

                    {errorResponse && <div className='errorMessage'>{errorResponse}</div>}
                    <div className='form--auth__input-group'>
                        <label>Username</label>
                        <input
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        ></input>
                    </div>
                    <div className='form--auth__input-group'>
                        <label>Password</label>
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </div>

                    <ButtonLink onClick={handleLogin} className='primary-button' text='Login'></ButtonLink>
                </form>
            </section>
        </DashboardLayout>
    );
};

export default Login;