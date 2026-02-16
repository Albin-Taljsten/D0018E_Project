import { useEffect, useState } from "react"
import axios from "axios";

import type { BasketItem } from "../types";
import CheckOut from "./CheckOut";
import { useNavigate } from "react-router-dom";

function Basket() {
    const [data, setData] = useState<BasketItem[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [orderData, setOrderData] = useState<BasketItem[]>([]);
    const navigate = useNavigate();
    // Fetch basket data from the backend when the component mounts
    // You can use axios or fetch to get the data and set it in state
    
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/LoginPage");
            return;
        }
        
        axios
        .get("http://localhost:5000/basket", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => setData(res.data))
        .catch((err) => console.log(err))
    }, [navigate]);

    const removeFromBasket = (product_id: number) => {
        // Implement the logic to remove an item from the basket
        // This might involve making a DELETE request to the backend
        const token = localStorage.getItem("token");
        axios
        .delete(`http://localhost:5000/basket/remove/${product_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            // Update the UI by removing the item from the state
            setData(prev => prev.filter(item => item.product_id !== product_id));
        })
        .catch((err) => console.log(err));
    }
    
    
    const updateQuantity = (product_id: number, new_quantity: number) => {
        const quantity = Math.max(1, new_quantity)
        const token = localStorage.getItem("token");

        setData(prev => prev.map(item => item.product_id === product_id ? {...item, quantity} : item));

        axios
        .post(`http://localhost:5000/basket/update/${product_id}`,
            { quantity }, 
            {
            headers: {
                Authorization: `Bearer ${token}`
            }
        
        })
        .catch((err) => console.log(err));
    }


    const handleCheckout = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("No token found, user might not be logged in.");
            return;
        }
        axios
        .post("http://localhost:5000/checkout",
            { basket_items: data },
            { headers: { Authorization: `Bearer ${token}` }}
        )
        .then(res => {
            console.log(res.data.message);
            setOrderData(data);
            setData([]) 
            setShowModal(true)
        })
        .catch((err) => console.log(err))
    }

    const getAllOrders = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("No token found, user might not be logged in.");
            return;
        }
        axios
        .get("http://localhost:5000/orders",
            { headers: { Authorization: `Bearer ${token}` }}
        )
        .then(res => {
            console.log(res.data.message);
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className="container py-5">
            <h1 className="text-center mt-5">Basket Page</h1>

            <div className="row">

                <div className="col-lg-8">
                    {data.map((item: any) => (
                        <div key={item.product_id} className="card shadow-sm mb-4">

                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="img-fluid rounded"
                                            style={{maxHeight: "200px", objectFit: "cover"}}
                                        />
                                    </div>
                                    <div className="col-md-9">
                                        

                                        <h5 className="mb-1">{item.name}</h5>
                                        <small className="text-muted">
                                            ${item.price} unit price
                                        </small>
                                
                                        <div className="row align-items-center">
                                            <div className="col-auto">

                                                <div className="input-group mb-2" style={{maxWidth: "200px"}}>
                                                    <button className="btn btn-outline-secondary" 
                                                        onClick={() => updateQuantity(item.product_id, item.quantity - 1)} 
                                                        disabled = {item.quantity <= 1}>
                                                        -
                                                    </button>
                                                    <input 
                                                        type="text"
                                                        inputMode="numeric"
                                                        pattern="[0-9]"
                                                        className="form-control text-center"
                                                        value={item.quantity} 
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            //only numbers
                                                            if(!/^\d*$/.test(value)) return;
                                                            const newQuantity = Math.max(1, Number(e.target.value));
                                                            setData(prev => 
                                                                prev.map( p => 
                                                                    p.product_id === item.product_id
                                                                    ? { ...p, quantity: newQuantity }
                                                                    : p
                                                                )
                                                            )
                                                        }}
                                                        onBlur = {() => updateQuantity(item.product_id, item.quantity)}
                                                    />
                                                    
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        onClick={() => updateQuantity(item.product_id, item.quantity + 1)}>
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        
                                        <div className="col text-end">
                                            <h5 className="mb-2">
                                                ${item.quantity * item.price}
                                            </h5>                                      
                                            <button 
                                                className="btn btn-sm btn-outline-danger" 
                                                onClick={() => removeFromBasket(item.product_id)}>
                                                Remove 
                                            </button>
                                        </div>
                                    </div>
                                            
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="col-lg-4">
                    <div className="card shadow-sm" style={{position: "sticky", top: "70px"}}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-3">
                                <h5 className="mb-0">Total:</h5>
                                <h5 className="mb-0">${data.reduce((total, item) => total + (item.quantity * item.price), 0)}</h5>
                            </div>
                            <button className="btn btn-dark w-100" onClick={handleCheckout} disabled={data.length === 0}>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
            <CheckOut 
                item={orderData}
                show={showModal}
                onClose={() => setShowModal(false)} 
            />
        </div>
    );
}
export default Basket;