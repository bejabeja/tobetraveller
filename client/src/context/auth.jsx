import React, { useEffect } from 'react';
import { createContext, useState } from 'react';
import getUserInfo from '../services/getUser.js';
import getAllFavsService from '../services/getAllFavs.js';
import getAllTravels from '../services/getAllUserTravels.js';

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accesToken, setAccesToken] = useState('')
    const [user, setUser] = useState('')
    const [favsInfo, setFavsInfo] = useState([])
    const [travels, setTravels] = useState([])


    useEffect(() => {
        checkAuth()
    }, [])

    useEffect(() => {

        if (isAuthenticated) {
            getAllFavsService(user.id)
                .then(favs => setFavsInfo(favs))
                .catch(err => console.log(err))
            getAllTravels(user.id)
                .then(travs => setTravels(travs))
                .catch(err => console.log(err))
        } else {
            setFavsInfo([]);
        }
    }, [isAuthenticated, user, setFavsInfo]);

    async function requestNewAccessToken(refreshToken) {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/refresh-token`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${refreshToken}`
                }
            })


            if (response.ok) {
                const json = await response.json()
                if (json.error) {
                    throw new Error(json.error)
                }
                return json.accessToken
            } else {
                throw new Error(response.statusText)
            }

        } catch (error) {
            // console.log(error)
            return null
        }
    }

    async function checkAuth() {
        if (accesToken) { //si el usuario esta autenticado, si hay un accestoken en memoria
            const userInfo = await getUserInfo(accesToken)
            if (userInfo) {
                saveSessionInfo(userInfo, accesToken, getRefreshToken())
            }
        } else {
            const token = getRefreshToken()
            if (token) {
                const newAccesToken = await requestNewAccessToken(token)
                if (newAccesToken) {
                    const userInfo = await getUserInfo(newAccesToken)
                    if (userInfo) {
                        saveSessionInfo(userInfo, newAccesToken, token)
                    }
                }
            }
        }
    }

    function signOut() {
        setIsAuthenticated(false)
        setAccesToken('')
        setUser(undefined)
        localStorage.removeItem('token')
    }

    function saveSessionInfo(userInfo, accesToken, refreshToken) {
        setAccesToken(accesToken)
        localStorage.setItem('token', JSON.stringify(refreshToken))
        setIsAuthenticated(true)
        setUser(userInfo)
    }

    function getAccesToken() {
        return accesToken;
    }

    function getRefreshToken() {
        const tokenData = localStorage.getItem('token')
        if (tokenData) {
            const token = JSON.parse(tokenData)
            return token
        }
        return null
    }

    function saveUser(userData) {
        saveSessionInfo(
            userData.body.user,
            userData.body.accesToken,
            userData.body.refreshToken
        )
    }

    function getUser() {
        return user
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            getAccesToken,
            saveUser,
            getRefreshToken,
            getUser,
            signOut,
            favsInfo,
            setFavsInfo,
            travels,
            setTravels
        }}>
            {children}
        </AuthContext.Provider>
    )
}