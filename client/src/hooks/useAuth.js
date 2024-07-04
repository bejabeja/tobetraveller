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
        favsInfo,
        setFavsInfo,
        travels,
        setTravels
    } = useContext(AuthContext)

    const user = getUser();
    const userId = user?.id;

    const addFav = useCallback((city_id) => {
        addFavService(city_id, userId)
            .then(favs => setFavsInfo(favs)
            )
            .catch(err => console.error(err));
    }, [userId, setFavsInfo]);

    const deleteFav = useCallback((city_id) => {
        deleteFavService(city_id, userId)
            .then(favs => {
                setFavsInfo(favs)
            })
            .catch(err => console.error(err));
    }, [userId, setFavsInfo]);

    return {
        addFav,
        deleteFav,
        favsInfo,
        setFavsInfo,
        travels,
        setTravels,
        isAuthenticated,
        getAccesToken,
        saveUser,
        getRefreshToken,
        user,
        signOut
    };
}