import { Link } from "react-router-dom";
import { useState } from "react";
import type { Product } from "../types";

interface Props {
    setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
}

function LoginIcon({ setFavorites }: Props) {
    const [ loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
    const handleLogout = () => {
        localStorage.removeItem("token");
        setFavorites([]);
        setLoggedIn(false);
    }
    return (
        <Link to="/LoginPage" className="nav-link d-flex align-items-center gap-2">
            <i className="bi bi-person fs-3"></i>
            <span onClick={handleLogout}>{loggedIn ? "Logout" : "Login"}</span>
        </Link>
    )
}

export default LoginIcon