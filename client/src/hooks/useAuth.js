import { useContext } from "react"
import { AuthContext } from '../context/auth.jsx'

export const useAuth = () => {
    const { isAuthenticated, getAccesToken, saveUser, getRefreshToken, getUser, signOut } = useContext(AuthContext)

    return { isAuthenticated, getAccesToken, saveUser, getRefreshToken, getUser, signOut };
}