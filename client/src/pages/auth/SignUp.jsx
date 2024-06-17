import React, { useState } from 'react';
import './Login.css';
import { useAuth } from '../../hooks/useAuth.js';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ButtonLink from '../../components/ButtonLink';
import SpinnerLoader from '../../components/SpinnerLoader';
import Layout from '../../layout/Layout';
import signup from '../../services/signup.js';

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const [errorResponse, setErrorResponse] = useState('')
    const [loading, setLoading] = useState(false)

    const auth = useAuth()
    const goTo = useNavigate();
    const inputErrorClass = errorResponse ? 'form--auth__input-group-input input-error' : 'form--auth__input-group-input'

    if (auth.isAuthenticated) {
        return <Navigate to='/private-profile'></Navigate>
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorResponse('')

        if (password !== repeatPassword) {
            setErrorResponse('Passwords do not match');
            return;
        }

        setLoading(true)

        setTimeout(async () => {
            try {
                await signup(username, email, password)
                goTo('/login')
            } catch (error) {
                setErrorResponse(error.message)
            }

            setLoading(false)
        }, 2000)
    };

    return (
        <Layout>
            <form className='form--auth'>
                <h1 className='form--auth__title'>Signup</h1>
                {loading ?
                    <SpinnerLoader />
                    : <>
                        {errorResponse && <div className='form--auth__errorMessage'>{errorResponse}</div>}
                        <div className='form--auth__input-group'>
                            <label>Username</label>
                            <input
                                type='text'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={inputErrorClass}
                            ></input>
                        </div>
                        <div className='form--auth__input-group'>
                            <label>Email</label>
                            <input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                        <div className='form--auth__input-group'>
                            <label>Repeat Password</label>
                            <input
                                type='password'
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                className={inputErrorClass}
                            ></input>
                        </div>
                        <ButtonLink onClick={handleSubmit} className='main--button' text='Create user'></ButtonLink>
                    </>
                }
                <Link to='/login' className='form--auth__link'>Already have an account?</Link>
            </form>
        </Layout>
    );
};

export default SignUp;