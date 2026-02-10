function HamburgerButton() {
    return (
        <>
            {/* Hamburger button */}
            <button
                className="btn nav-link"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#sideMenu"
                aria-controls="sideMenu"
            >
                <i className="bi bi-list fs-4"></i>
            </button>
        </>
    )
}

export default HamburgerButton