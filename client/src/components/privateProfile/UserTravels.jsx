import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import '../../pages/PrivateProfile.css';
import getTravels from "../../services/getAllUserTravels";
import ButtonLink from "../ButtonLink";

const UserTravels = () => {
    const { userTravels, setUserTravels, user } = useAuth()

    useEffect(() => {
        const fetchAllTravels = async () => {
            try {
                const data = await getTravels(user.id);
                setUserTravels(data);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchAllTravels()

    }, [])

    return (
        <section className='private-profile--section'>
            <h1> My travels </h1>
            <p>Currently you have <strong>{userTravels?.length} travels</strong> created!</p>

            {userTravels?.map((trav) => (
                <ButtonLink key={trav.id} href={`/private-profile/created-travel/${trav.id}`} className='private-profile--fav-info'>
                    {trav.thumbnail &&
                        <div className="image-container">
                            <img src={trav.thumbnail}></img>
                        </div>
                    }
                    <p>{trav.title}</p>
                </ButtonLink>
            ))}
        </section>
    )
}

export default UserTravels