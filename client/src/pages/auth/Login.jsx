import React, { useState } from 'react';
import Layout from '../../layout/Layout';
import './Login.css'
import { useAuth } from '../../hooks/useAuth.js';
import { useLocation, useNavigate, Navigate, Link } from 'react-router-dom';
import ButtonLink from '../../components/ButtonLink'
import SpinnerLoader from '../../components/SpinnerLoader';

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorResponse, setErrorResponse] = useState('')
    const [loading, setLoading] = useState(false)

    const auth = useAuth()
    const goTo = useNavigate()
    const { state } = useLocation()
    const inputErrorClass = errorResponse ? 'form--auth__input-group-input input-error' : 'form--auth__input-group-input'

    if (auth.isAuthenticated) {
        return <Navigate to='/private-profile'></Navigate>
    }

    const handleLogin = (e) => {
        e.preventDefault()
        setErrorResponse('')
        setLoading(true);
        setTimeout(async () => {
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
                    setErrorResponse('')
                    const json = await response.json()

                    if (json.body.accesToken && json.body.refreshToken) {
                        auth.saveUser(json)
                        goTo(state?.pathname ?? '/')
                    }

                } else {
                    const json = await response.json()
                    setErrorResponse(json.body.error)
                }
            } catch (error) {
                console.log(error)
            }
            setLoading(false);
        }, 2000);

    };

    return (
        <Layout>
            <form className='form--auth'>
                <h1 className='form--auth__title'>Login</h1>
                {loading ? <SpinnerLoader /> :
                    <>
                        {errorResponse &&
                            <div className='form--auth__errorMessage'>
                                <h3>Please correct the following</h3>
                                <div>
                                    {errorResponse}
                                </div>
                            </div>
                        }
                        <div className='form--auth__input-group'>
                            <label>Username</label>
                            <input
                                type='text'
                                value={username}
                                onChange={(e) => { setUsername(e.target.value) }}
                                className={inputErrorClass}
                            ></input>
                        </div>
                        <div className='form--auth__input-group'>
                            <label>Password</label>
                            <input
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={inputErrorClass}
                            ></input>
                        </div>

                        <ButtonLink onClick={handleLogin} className='main--button' text='Login'></ButtonLink>
                    </>
                }

                <Link to='/signup' className='form--auth__link'>Not a member yet?</Link>

            </form>
        </Layout>
    );
};

export default Login;