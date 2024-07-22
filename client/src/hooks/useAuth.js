import { useCallback, useContext } from "react"
import { AuthContext } from '../context/auth.jsx'
import addFavService from "../services/addFav.js"
import deleteFavService from "../services/deleteFav.js"
import saveUserCityService from "../services/saveUserTravels.js"

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
        userTravels,
        setUserTravels
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

    const saveCity = useCallback((userTravel) => {
        saveUserCityService(userTravel, userId)
            .then((travels) => {
                setUserTravels(travels)
            })
            .catch(err => console.error(err))
    }, []

    )

    return {
        addFav,
        deleteFav,
        favsInfo,
        setFavsInfo,
        userTravels,
        setUserTravels,
        saveCity,
        isAuthenticated,
        getAccesToken,
        saveUser,
        getRefreshToken,
        user,
        signOut
    };
}