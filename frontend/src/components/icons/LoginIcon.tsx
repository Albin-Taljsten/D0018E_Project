import { Link } from "react-router-dom";

function LoginIcon() {
    return (
        <Link to="/LoginPage" className="nav-link d-flex align-items-center gap-2">
            <i className="bi bi-person fs-3"></i>
            <span>Login</span>
        </Link>
    )
}

export default LoginIcon