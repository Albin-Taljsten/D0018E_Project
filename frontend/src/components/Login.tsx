type LoginProps = {
    toggleModal: () => void;
}

function Login({ toggleModal }: LoginProps){
    return(
        <div className="containter border border-dark border-2 pt-5 pb-5 my-5 mx-auto text-center rounded" style={{width: '500px'}}>
            <h2 className="text-decoration-underline">Login Page</h2>
            <form className="mx-auto" style={{width: '300px'}}>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter Email" name="email"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter Password" name="password"/>
                </div>
                <div className="d-flex justify-content-center gap-3 mt-4">
                    <button type="submit" className="btn btn-dark">Login</button>
                    <button onClick={toggleModal} type="button" className="btn btn-dark">Create account</button>
                </div>
            </form>
        </div>
    )
}

export default Login