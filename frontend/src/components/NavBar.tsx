import { Link } from 'react-router-dom'

function NavBar(){
    return(
        <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top" style={{height: '10vh'}}>
                <div className="container-fluid fs-4">
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <Link className="navbar-brand" to="/">Home</Link>

                        <form className='d-flex mx-auto' style={{transform: "translateX(50%)"}}>
                            <input className='form-control me-2' 
                                type='search' 
                                placeholder='Sök bland artiklar' 
                                style={{width: '500px'}}>
                            </input>
                        </form>

                    
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/Login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Favorite">Favorites</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/About">About</Link>
                            </li>    
                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}
export default NavBar