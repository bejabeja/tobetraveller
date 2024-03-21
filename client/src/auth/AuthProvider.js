import React, { useEffect } from 'react';
import { useContext, createContext, useState } from 'react'

const AuthContext = createContext({
    isAuthenticated: false,
    getAccesToken: () => { },
    saveUser: (userData) => { },
    getRefreshToken: () => { }
})

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accesToken, setAccesToken] = useState('')
    const [user, setUser] = useState('')

    useEffect(() => { }, [])

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
                const json = await response.json
                if (json.error) {
                    throw new Error(json.error)
                }
                return json.body.accesToken
            } else {
                throw new Error(response.statusText)
            }

        } catch (error) {
            console.log(error)
            return null
        }
    }

    async function getUserInfo(accesToken) {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${accesToken}`
                }
            })

            if (response.ok) {
                const json = await response.json
                if (json.error) {
                    throw new Error(json.error)
                }
                return json
            } else {
                throw new Error(response.statusText)
            }

        } catch (error) {
            console.log(error)
            return null
        }
    }

    async function checkAuth() {

        if (accesToken) { //si el usuario esta autenticado, si hay un accestoken en memoria
            console.log('')
        } else {
            const token = getRefreshToken()
            if (token) {
                const newAccesToken = requestNewAccessToken(token)
                if (newAccesToken) {
                    const userInfo = await getUserInfo(newAccesToken)
                    if (userInfo) {
                        saveSessionInfo(userInfo, newAccesToken, token)
                    }
                }
                console.log('')
            }
        }
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
        const token = localStorage.getItem('token')
        if (token) {
            const { refreshToken } = JSON.parse(token)
            return refreshToken
        }
        return null
    }

    function saveUser(userData) {
        saveSessionInfo(userData.body.user, userData.body.accesToken, userData.body.refreshToken)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, getAccesToken, saveUser, getRefreshToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)