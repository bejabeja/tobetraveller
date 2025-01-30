import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import LogoutLink from '../LogoutLink'
import './NavbarSide.css'

const NavbarSide = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    return (
        <div className='sidenav'>
            <nav className='sidenav-nav'>
                <Link to="/" className={location.pathname === '/' ? 'navbarside-link--active' : undefined} >
                    <i className="fas fa-home"></i><span>Home</span>
                </Link>
                <Link to="/discover" className={location.pathname === '/discover' ? 'navbarside-link--active' : undefined}>
                    <i className="fas fa-hashtag"></i><span>Discover</span>
                </Link>
                {/* <Link to="#notifications"><i className="fas fa-bell"></i><span>Notificaciones</span></Link> */}
                {/* <Link to="#messages"><i className="fas fa-envelope"></i><span>Mensajes</span></Link> */}

                {isAuthenticated &&
                    <>
                        <Link to="/favorites" className={location.pathname === '/favorites' ? 'navbarside-link--active' : undefined}>
                            <i className="fas fa-bookmark"></i><span>Favorites</span>
                        </Link>
                        <Link to="/my-travels" className={location.pathname === '/my-travels' ? 'navbarside-link--active' : undefined}>
                            <i className="fas fa-plane"></i><span>My Travels</span>
                        </Link>
                    </>
                }
                {/* <Link to="#lists"><i className="fas fa-list"></i><span>Listas</span></Link> */}
                <Link to="/private-profile" className={location.pathname === '/private-profile' ? 'navbarside-link--active' : undefined}>
                    <i className="fas fa-user"></i><span>Profile</span>
                </Link>
                {/* <Link to="#more"><i className="fas fa-ellipsis-h"></i><span>Más</span></Link> */}

                {isAuthenticated &&
                    <LogoutLink><i className="fas fa-sign-out-alt"></i><span>Exit</span></LogoutLink>

                }
            </nav>
        </div>
    )
}

export default NavbarSide