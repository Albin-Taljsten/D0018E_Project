function SearchBar() {
    return (
        <form className='d-flex mx-auto' style={{transform: "translateX(50%)"}}>
            <input className='form-control me-2' 
                type='search' 
                placeholder='Search for product' 
                style={{width: '30em'}}>
            </input>
        </form>
    )
}

export default SearchBar