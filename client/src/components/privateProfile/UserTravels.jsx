import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import '../../pages/PrivateProfile.css';
import getTravels from "../../services/getAllUserTravels";
import ButtonLink from "../ButtonLink";

const UserTravels = () => {
    const { travels, setTravels, user } = useAuth()

    useEffect(() => {
        const fetchAllTravels = async () => {
            try {
                const data = await getTravels(user.id);
                setTravels(data);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchAllTravels()

    }, [])

    return (
        <section className='private-profile--section'>
            <h1> Private travels</h1>

            <p>Currently you have <strong>{travels.length} travels</strong> created!</p>

            {travels?.map((trav) => (
                <ButtonLink key={trav.id} href={`/travels/${trav.id}`} className='private-profile--fav-info'>
                    <img src={trav.thumbnail}></img>
                    <p>{trav.title}</p>
                </ButtonLink>
            ))}
            {/* <ButtonLink href='/trip/create ' className='main--button' text='Add fav'> </ButtonLink> */}
        </section>
    )
}

export default UserTravels