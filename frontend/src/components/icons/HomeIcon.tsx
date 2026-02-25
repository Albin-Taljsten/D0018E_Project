import { Link } from "react-router-dom";

function HomeIcon() {
    return (
        <Link to="/" className="nav-link d-flex align-items-center gap-2">
            <svg
                width="auto"     // wide
                height="40"     // short
                viewBox="0 5 150 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: 'visible' }}
            >
                {/* Mountain peaks */}
                <polygon points="10,50 30,10 50,50" fill="#e0eaff" />
                <polygon points="40,50 60,15 80,50" fill="#858d99" />
                <polygon points="70,50 90,20 110,50" fill="#e0eaff" />
            </svg>
        </Link>
    )
}

export default HomeIcon