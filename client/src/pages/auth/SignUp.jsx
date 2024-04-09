import React, { useState } from 'react';
import './Login.css';
import { useAuth } from '../../auth/AuthProvider';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ButtonLink from '../../components/ButtonLink';
import SpinnerLoader from '../../components/SpinnerLoader';
import Layout from '../../layout/Layout';

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
        return <Navigate to='/'></Navigate>
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
                await axiosPostData()
            } catch (error) {
                console.log(error)
            }

            setLoading(false)
        }, 2000)

    };


    const axiosPostData = async () => {
        const postData = {
            username: username,
            email: email,
            password: password
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, postData)
            if (response.status === 200) {
                console.log("User created successfully")
                setErrorResponse('')
                goTo('/login')
            } else {
                console.log("Something went wrong")
                setErrorResponse(response.data.error)
            }
        } catch (error) {
            console.log("Network error:", error.response.data.body.error)
            setErrorResponse(error.response.data.body.error)
        }
    }

    return (
        <Layout>
            <section className='section'>
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
            </section>
        </Layout>
    );
};

export default SignUp;