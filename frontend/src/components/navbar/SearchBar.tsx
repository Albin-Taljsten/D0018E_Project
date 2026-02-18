function SearchBar() {
    return (
        <form className='d-flex'>
            <input className='form-control' 
                type='search' 
                placeholder='Search for product' 
                //style={{width: '30em'}}
                >
            </input>
        </form>
    )
}

export default SearchBar