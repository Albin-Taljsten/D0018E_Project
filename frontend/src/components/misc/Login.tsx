import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HOST } from "..";


function Login(){
    const [formData, setFormData] = useState({
        Name: "",
        Email: "",
        Password: "",
    });
    const [action, setAction] = useState("Login");


    const navigate =useNavigate()

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try{
            if(action === "Create Account"){
                await axios.post(`http://${HOST}:5000/users/register`, formData);
            }
            const res = await axios.post(`http://${HOST}:5000/users/login`, formData);

            localStorage.setItem("token", res.data.token);
            navigate("/")
            //To update the NavBar component to show "Logout" instead of "Login" after a successful login.
            window.location.reload();
            //Login successful, navigate to home page
        }catch(err){
            console.log(err);
        }
    };
    return(
        <div className="container border border-dark border-2 pt-5 pb-5 my-5 mx-auto text-center rounded" style={{width: '500px'}}>
            <h2 className="text-decoration-underline">{action}</h2>
            <form className="mx-auto" style={{width: '300px'}}>
                {action === "Create Account" && ( 
                    <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter Name" onChange={handleChange} name="Name"/>
                </div>
                )}
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter Email" onChange={handleChange} name="Email"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter Password" onChange={handleChange} name="Password"/>
                </div>
                <div className="d-flex justify-content-center gap-3 mt-4">
                    <button type="button" className={action=== "Login" ? "btn btn-dark" : "btn btn-secondary"} onClick={action === "Login" ? handleClick : () => setAction("Login")}>Login</button>
                    <button type="button" className={action === "Create Account" ? "btn btn-dark" : "btn btn-secondary"}  onClick={action === "Create Account" ? handleClick : () => setAction("Create Account")}>Create account</button>
                </div>
            </form>
        </div>
    )
}

export default Login