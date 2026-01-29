type CreateAccountProps = {
    toggleModal: () => void;
}

function CreateAccount({ toggleModal }: CreateAccountProps){
    return (
        <div className="containter border border-dark border-2 pt-5 pb-5 my-5 mx-auto text-center rounded" style={{width: '500px', border: '5px'}}>
            <h2 className="text-decoration-underline">Create Account</h2>
            <form className="mx-auto" style={{width: '300px'}}>
                <div className="mb-3">
                    <label className="form-label">First name:</label>
                    <input type="text" className="form-control" id="name" placeholder="First name" name="name"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Last name:</label>
                    <input type="text" className="form-control" id="name" placeholder="Last name" name="name"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter Email" name="email"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter Password" name="password"/>
                </div>
                <div className="d-flex justify-content-center gap-3 mt-4">
                    <button onClick={toggleModal} type="button" className="btn btn-dark">Login</button>
                    <button type="submit" className="btn btn-dark">Create account</button>
                </div>
            </form>
        </div>
    )
}

export default CreateAccount