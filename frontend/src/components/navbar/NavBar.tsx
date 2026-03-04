import { Link } from 'react-router-dom'
import { BasketIcon, FavoriteIcon, LoginIcon, ModerationIcon } from '../icons'
import { HamburgerButton, SearchBar } from '.'
import type { Product } from '../types';
import { useEffect, useState } from 'react';

interface Props {
    setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
}

function NavBar({ setFavorites }: Props) {
    const [isAdmin, setIsAdmin] = useState(false);
    const role = localStorage.getItem("role");
    useEffect (() => {
        if(role === "admin"){
            setIsAdmin(true);
        }else{
            setIsAdmin(false);
        }
    })
    return(
        <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top" style={{height: '10vh'}}>
                <div className="container-fluid fs-4 d-flex align-items-center flax-wrap">
                    {/* <div className="collapse navbar-collapse" id="collapsibleNavbar"> */}
                        <ul className="navbar-nav align-item-center">
                            <li className="nav-item">
                                <HamburgerButton />
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                        </ul>

                        {/* Center */}

                        <div className="position-absolute  start-50 translate-middle-x" style={{width: "100%", maxWidth: "400px", padding: "0 1rem"}}>
                            <SearchBar></SearchBar>
                        </div>
                    
                        {/* Right side */}
                        <ul className="navbar-nav ms-auto align-items-center">
                            {isAdmin ? (
                                <>
                                    <li className='nav-item'>
                                        <ModerationIcon />
                                    </li>
                                    <li className="nav-item">
                                        <LoginIcon setFavorites={setFavorites}></LoginIcon>
                                    </li>

                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <FavoriteIcon></FavoriteIcon>
                                    </li>
                                    <li className="nav-item">
                                        <LoginIcon setFavorites={setFavorites}></LoginIcon>
                                    </li>
                                    <li className="nav-item">
                                        <BasketIcon></BasketIcon>
                                    </li>
                                </>
                            )}
                        </ul>

                    {/* </div> */}


                </div>
            </nav>
        </div>
    )
}
export default NavBar