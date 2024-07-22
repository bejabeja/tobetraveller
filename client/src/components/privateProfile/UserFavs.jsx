import React, { useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import ButtonLink from "../ButtonLink"
import getFavs from "../../services/getAllFavs"
import '../../pages/PrivateProfile.css'


const UserFavs = () => {
    const { user, favsInfo, setFavsInfo } = useAuth()

    useEffect(() => {
        const fetchAllFavs = async () => {
            try {
                const data = await getFavs(user.id);
                setFavsInfo(data);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchAllFavs();
    }, [])

    return (
        <section className='private-profile--section'>
            <h1> Favorite destinations</h1>

            <p>Currently you have <strong>{favsInfo.length} trips</strong> on favs!</p>

            {favsInfo?.map((fav) => (
                <ButtonLink key={fav.id} href={`/discover/${fav.id}`} className='private-profile--fav-info'>
                    <img src={fav.city_thumbnail}></img>
                    <p>{fav.city_name}</p>
                </ButtonLink>
            ))}
            {/* <ButtonLink href='/discover' className='main--button' text='Add fav'> </ButtonLink> */}
        </section>
    )

}

export default UserFavs