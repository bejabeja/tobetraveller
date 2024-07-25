import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import SingoutLink from '../../components/SignoutLink'
import './NavbarSide.css'

const NavbarSide = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className='sidenav'>
            <nav className='sidenav-nav'>
                <Link to="/"><i className="fas fa-home"></i><span>Home</span></Link>
                <Link to="/discover"><i className="fas fa-hashtag"></i><span>Discover</span></Link>
                {/* <Link to="#notifications"><i className="fas fa-bell"></i><span>Notificaciones</span></Link> */}
                {/* <Link to="#messages"><i className="fas fa-envelope"></i><span>Mensajes</span></Link> */}

                {isAuthenticated &&
                    <>
                        <Link to="/favorites"><i className="fas fa-bookmark"></i><span>Favorites</span></Link>
                        <Link to="/my-travels"><i className="fas fa-plane"></i><span>My Travels</span></Link>
                    </>
                }
                {/* <Link to="#lists"><i className="fas fa-list"></i><span>Listas</span></Link> */}
                <Link to="/private-profile"><i className="fas fa-user"></i><span>Profile</span></Link>
                {/* <Link to="#more"><i className="fas fa-ellipsis-h"></i><span>Más</span></Link> */}

                {isAuthenticated &&
                    <SingoutLink><i className="fas fa-sign-out-alt"></i><span>Exit</span></SingoutLink>

                }
            </nav>
        </div>
    )
}

export default NavbarSide