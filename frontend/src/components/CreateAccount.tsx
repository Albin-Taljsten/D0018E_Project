import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type CreateAccountProps = {
    toggleModal: () => void;
}

function CreateAccount({ toggleModal }: CreateAccountProps){
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate =useNavigate()

    const handleChange = (e) => {
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async e => {
        e.preventDefault();
        try{
            await axios.post("http://localhost:5000/customers", formData);
            //Login
            navigate("/")
        }catch(err){
            console.log(err);
        }
    };


    
    return (
        <div className="containter border border-dark border-2 pt-5 pb-5 my-5 mx-auto text-center rounded" style={{width: '500px', border: '5px'}}>
            <h2 className="text-decoration-underline">Create Account</h2>
            <form className="mx-auto" style={{width: '300px'}}>
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter Name" onChange={handleChange} name="name"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter Email" onChange={handleChange}  name="email"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter Password" onChange={handleChange}  name="password"/>
                </div>
                <div className="d-flex justify-content-center gap-3 mt-4">
                    <button onClick={toggleModal} type="button" className="btn btn-dark">Login</button>
                    <button type="submit" className="btn btn-dark" onClick={handleClick}>Create account</button>
                </div>
            </form>
        </div>
    )
}

export default CreateAccount