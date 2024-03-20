import React, { useState } from 'react';
import Layout from '../layout/Layout';
import './Login.css'
import { useAuth } from '../auth/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';

const SignUp = ({ onLogin }) => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorResponse, setErrorResponse] = useState('')


    const auth = useAuth()
    const goTo = useNavigate();

    if (auth.isAuthenticated) {
        return <Navigate to='/dashboard'></Navigate>
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    username,
                    password
                })
            })

            if (response.ok) {
                console.log("User created succesfully")
                setErrorResponse('')
                goTo('/')
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
        <Layout>
            <form className='section--loggin' onSubmit={handleSubmit}>
                <h1>Signup</h1>
                {errorResponse && <div className='errorMessage'>{errorResponse}</div>}
                <label>Name</label>
                <input type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}></input>

                <label>Username</label>
                <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}></input>

                <label>Password</label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>

                <button>Create user</button>
            </form>
        </Layout>
    );
};

export default SignUp;