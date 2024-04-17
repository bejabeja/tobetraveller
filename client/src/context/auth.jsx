import React, { useEffect } from 'react';
import { createContext, useState } from 'react'

export const AuthContext = createContext({
    isAuthenticated: false,
    getAccesToken: () => { },
    saveUser: (userData) => { },
    getRefreshToken: () => { },
    getUser: () => { },
    signOut: () => { }
})

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accesToken, setAccesToken] = useState('')
    const [user, setUser] = useState('')

    useEffect(() => {
        checkAuth()
    }, [])

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
                const json = await response.json()
                if (json.error) {
                    throw new Error(json.error)
                }
                return json.body
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
        <AuthContext.Provider value={{ isAuthenticated, getAccesToken, saveUser, getRefreshToken, getUser, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}