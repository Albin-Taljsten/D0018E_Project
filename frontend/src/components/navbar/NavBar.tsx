import { Link } from 'react-router-dom'
import { BasketIcon, FavoriteIcon, LoginIcon } from '../icons'
import { HamburgerButton, SearchBar } from '.'
import { useState } from 'react'

function NavBar(){
    const [ active, setActive] = useState(!!localStorage.getItem("token"));
    const handleLogout = () => {
        localStorage.removeItem("token")
        setActive(false)
    }
    return(
        <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top" style={{height: '10vh'}}>
                <div className="container-fluid fs-4">
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav align-item-center">
                            <li className="nav-item">
                                <HamburgerButton />
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                        </ul>

                        {/* Center */}
                        <div className="mx-auto">
                            <SearchBar></SearchBar>
                        </div>
                    
                        {/* Right side */}
                        <ul className="navbar-nav ms-auto align-items-center">
                            <li className="nav-item">
                                <FavoriteIcon></FavoriteIcon>
                            </li>
                            <li className="nav-item">
                                <LoginIcon></LoginIcon>
                            </li>
                            <li className="nav-item">
                                <BasketIcon></BasketIcon>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}
export default NavBar