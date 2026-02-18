import { useState, type ReactNode } from "react";
import { Link, type To } from "react-router-dom";

interface HoverLinkProps {
  to: To;             // react-router-dom Link 'to' prop type
  children: ReactNode; // anything inside the Link
}

function HoverLink({ to, children }: HoverLinkProps) {
    const [hover, setHover] = useState(false);

    return (
        <Link 
            to={to}
            className="d-flex justify-content-between align-items-center w-100 text-dark text-decoration-none fs-4"
            style={{
                backgroundColor: hover ? "#f1f1f1" : "white", // white background, light gray on hover
                padding: "0.75rem 1rem", // same as SkiStar menu
                transition: "background-color 0.2s ease",
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {children}
        </Link>
    );
}

function HamburgerMenu() {
    const categories = [
        { name: "Women", path: "/women" },
        { name: "Men", path: "/men" },
        { name: "Children", path: "/children" },
        { name: "Equipment", path: "/equipment" },
    ];

    const accountLinks = [
        { name: "Login / Register", path: "/LoginPage" }
    ];

    return (
        <>
            {/* Offcanvas menu */}
            <div 
                className="offcanvas offcanvas-start" 
                id="sideMenu"
                tabIndex={-1}
            >
                <div className="offcanvas-header">
                    <h3 className="offcanvas-title">Categories</h3>
                    <button 
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body d-flex flex-column">
                    {/* Main categories */}
                    <ul className="list-unstyled">
                        {categories.map((cat) => (
                            <li key={cat.name} data-bs-dismiss="offcanvas">
                                <HoverLink to={cat.path}>
                                    <span>{cat.name}</span>
                                    <span>&gt;</span>
                                </HoverLink>
                            </li>
                        ))}
                    </ul>
                    <hr className="my-2"/>
                    {/* Account links */}
                    <ul className="list-unstyled mt-3">
                        {accountLinks.map((link) => (
                            <li key={link.name} data-bs-dismiss="offcanvas">
                                <Link 
                                    to={link.path} 
                                    className="text-dark text-decoration-none fs-6 px-3"
                                >
                                    <span>{link.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default HamburgerMenu