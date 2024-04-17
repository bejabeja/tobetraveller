import { useContext } from "react"
import { AuthContext } from '../context/auth.jsx'

export const useAuth = () => {
    const authContext = useContext(AuthContext)


    if (!authContext) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return authContext;
}