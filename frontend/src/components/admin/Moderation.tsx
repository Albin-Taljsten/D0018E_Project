import { useState } from "react"
import AddProduct from "./AddProduct"
import ModifyProduct from "./ModifyProduct";

function Moderation(){
    const [service, setService] = useState("");

    return(
        <div className="containter border d-flex justify-content-center mt-3 row">
            <h1>Moderation Page</h1>
            <div className="containter d-flex justify-content-center md-3 gap-2">
                <button type="button" className="btn btn-dark mt-3" onClick={() => setService("add product")}>Add product</button>
                <button type="button" className="btn btn-dark mt-3" onClick={() => setService("modify product")}>Modify product</button>
            </div>

            {service === "add product" ? (<AddProduct />) : 
             (<ModifyProduct />)}
        </div>
    )
}

export default Moderation