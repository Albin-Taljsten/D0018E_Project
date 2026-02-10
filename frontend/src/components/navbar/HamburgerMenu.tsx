function HamburgerMenu() {
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
                <div className="offcanvas-body">
                    <p>Some text</p>
                    <p>Some text</p>
                    <p>Some text</p>
                    <p>Some text</p>
                    <button className="btn btn-secondary" type="button">A Button</button>
                </div>
            </div>
        </>
    )
}

export default HamburgerMenu