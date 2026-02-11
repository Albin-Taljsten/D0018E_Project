import { Link } from "react-router-dom";
import { useState } from "react";
function LoginIcon() {
    const [ loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
    const handleLogout = () => {
        localStorage.removeItem("token")
        setLoggedIn(false)
    }
    return (
        <Link to="/LoginPage" className="nav-link d-flex align-items-center gap-2">
            <i className="bi bi-person fs-3"></i>
            <span onClick={handleLogout}>{loggedIn ? "Logout" : "Login"}</span>
        </Link>
    )
}

export default LoginIcon