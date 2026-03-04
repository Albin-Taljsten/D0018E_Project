import { useState } from "react"
import ModifyProduct from "./ModifyProduct";
import ProductForm from "./ProductForm";

function Moderation(){
    const [service, setService] = useState("");

    return(
        <div className="containter d-flex justify-content-center mt-3 row">
            <div className="d-flex justify-content-center mt-3 mb-3">
                <h1>Moderation Page</h1>
            </div>
            <div className="containter d-flex justify-content-center md-3 gap-2">
                <button type="button" className={`btn btn-dark mt-3 ${service === "add product" ? "active" : ""}`} onClick={() => setService("add product")}>Add product</button>
                <button type="button" className={`btn btn-dark mt-3 ${service === "modify product" ? "active" : ""}`} onClick={() => setService("modify product")}>Modify product</button>
            </div>

            {service === "add product" ? (<ProductForm onFinish={() => setService("")} />) : 
             (<ModifyProduct />)}
        </div>
    )
}

export default Moderation