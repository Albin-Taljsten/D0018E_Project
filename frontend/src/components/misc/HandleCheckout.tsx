
import axios from "axios";
import type { BasketItem } from "../types";

function HandleCheckout(basket_items: BasketItem[]){

    
    const token = localStorage.getItem("token");
    if (!token) {
        console.log("No token found, user might not be logged in.");
        return;
    }
    axios
    .post("http://localhost:5000/checkout",
        { basket_items },
        { headers: { Authorization: `Bearer ${token}` }}
    )
    .then(res => {console.log(res.data.message) 
    })
    .catch((err) => console.log(err))
    

}

export default HandleCheckout;