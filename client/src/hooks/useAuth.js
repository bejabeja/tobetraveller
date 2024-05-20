import { useCallback, useContext } from "react"
import { AuthContext } from '../context/auth.jsx'
import addFavService from "../services/addFav.js"

export const useAuth = () => {
    const {
        isAuthenticated,
        getAccesToken,
        saveUser,
        getRefreshToken,
        getUser,
        signOut,
        favs,
        setFavs
    } = useContext(AuthContext)

    const user = getUser();
    const user_id = user.user_id;

    const addFav = useCallback(({ city_id }) => {
        addFavService({ city_id, user_id })
            .then(favs => setFavs(favs))
            .catch(err => {
                console.error(err)
            })
    }, [user_id, setFavs])

    return { addFav, isAuthenticated, getAccesToken, saveUser, getRefreshToken, getUser, signOut };
}