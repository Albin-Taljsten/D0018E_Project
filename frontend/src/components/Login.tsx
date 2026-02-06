import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginProps = {
    toggleModal: () => void;
}

function Login({ toggleModal }: LoginProps){
    const [formData, setFormData] = useState({
        Email: "",
        Password: "",
    });

    const navigate =useNavigate()

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try{
            await axios.post("http://localhost:5000/users/login", formData);
            //Login
            navigate("/")
        }catch(err){
            console.log(err);
        }
    };
    return(
        <div className="container border border-dark border-2 pt-5 pb-5 my-5 mx-auto text-center rounded" style={{width: '500px'}}>
            <h2 className="text-decoration-underline">Login Page</h2>
            <form className="mx-auto" style={{width: '300px'}}>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter Email" onChange={handleChange} name="Email"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter Password" onChange={handleChange} name="Password"/>
                </div>
                <div className="d-flex justify-content-center gap-3 mt-4">
                    <button type="submit" className="btn btn-dark" onClick={handleClick}>Login</button>
                    <button onClick={toggleModal} type="button" className="btn btn-dark">Create account</button>
                </div>
            </form>
        </div>
    )
}

export default Login