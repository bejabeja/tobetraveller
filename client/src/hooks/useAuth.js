import { useCallback, useContext } from "react"
import { AuthContext } from '../context/auth.jsx'
import addFavService from "../services/addFav.js"
import deleteFavService from "../services/deleteFav.js"

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
    const user_id = user?.user_id;

    const addFav = useCallback((city_id) => {
        addFavService(city_id, user_id)
            .then(favs => {
                setFavs(favs);
            })
            .catch(err => {
                console.error(err);
            });
    }, [user_id, setFavs]);

    const deleteFav = useCallback((city_id) => {
        deleteFavService(city_id, user_id)
            .then(favs => setFavs(favs))
            .catch(err => {
                console.error(err);
            });
    }, [user_id, setFavs]);

    return { addFav, deleteFav, favs, isAuthenticated, getAccesToken, saveUser, getRefreshToken, getUser, signOut };
}