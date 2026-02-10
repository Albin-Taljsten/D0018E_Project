import { Link } from "react-router-dom";

function FavoriteIcon() {
    return (
        <Link to="/FavoritePage" className="nav-link d-flex align-items-center gap-2">
            <i className="bi bi-heart fs-4"></i>
            <span>Favorites</span>
        </Link>
    )
}

export default FavoriteIcon