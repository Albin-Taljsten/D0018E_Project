import Login from "../components/Login"
import CreateAccount from "../components/CreateAccount"
import { useState } from "react";
function LoginPage(){
    const [ modal, setModal] = useState(true);

    function toggleModal(){
        setModal(prev => !prev)
    }
    return(
        <div>
            {modal == true ? (<Login toggleModal={toggleModal}/>) : (<CreateAccount toggleModal={toggleModal}/>)}
        </div>
    )
}

export default LoginPage