import { Link } from "react-router-dom";

function ModerationIcon(){
    return(
        
        <Link to="/moderation" className="nav-link d-flex align-items-center gap-2">
            <i className="bi bi-wrench fs-4"></i>
            <span>Moderation</span>
        </Link>
    
    )
}

export default ModerationIcon