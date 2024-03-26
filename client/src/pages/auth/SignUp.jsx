import React, { useState } from 'react';
import DashboardLayout from '../../layout/DashboardLayout';
import './Login.css'
import { useAuth } from '../../auth/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios'

const SignUp = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorResponse, setErrorResponse] = useState('')


    const auth = useAuth()
    const goTo = useNavigate();

    if (auth.isAuthenticated) {
        return <Navigate to='/'></Navigate>
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        axiosPostData()
    };


    const axiosPostData = async () => {
        const postData = {
            username: username,
            name: name,
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
                setErrorResponse(response.data.error || 'An error occurred')
            }
        } catch (error) {
            console.log("Network error:", error)
            setErrorResponse('Network error. Please try again later.')
        }
    }

    return (
        <DashboardLayout>
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
        </DashboardLayout>
    );
};

export default SignUp;