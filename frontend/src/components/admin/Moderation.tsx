import { useState } from "react"
import AddProduct from "./AddProduct"
import RemoveProduct from "./RemoveProduct";
import ModifyProduct from "./ModifyProduct";

function Moderation(){
    const [service, setService] = useState("");

    const selectService = (service: string) => {
        setService(service);
        if(service === "add product"){

        }
    }

    return(
        <div className="containter border d-flex justify-content-center mt-3 row">
            <h1>Moderation Page</h1>
            <div className="containter d-flex justify-content-center md-3">
                <button type="button" className="btn btn-dark mt-3" onClick={() => setService("add product")}>Add product</button>
                <button type="button" className="btn btn-dark mt-3" onClick={() => setService("remove product")}>Remove product</button>
                <button type="button" className="btn btn-dark mt-3" onClick={() => setService("modify product")}>Modify product</button>
            </div>

            {service === "add product" ? (<AddProduct />) : 
             service === "remove product" ? (<RemoveProduct />) : 
             (<ModifyProduct />)}
        </div>
    )
}

export default Moderation