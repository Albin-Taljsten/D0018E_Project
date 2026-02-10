import { Link } from "react-router-dom";

function BasketIcon() {
    return (
        <Link to="/basketPage" className="nav-link d-flex align-items-center gap-2">
            <i className="bi bi-bag-check fs-4"></i>
            <span>Basket</span>
        </Link>
    )
}

export default BasketIcon