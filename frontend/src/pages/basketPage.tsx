import { useEffect, useState } from "react"
import axios from "axios";

interface BasketItem {
    product_id: number;
    name: string;
    quantity: number;
    price: number;
}

function BasketPage() {
    const [data, setData] = useState<BasketItem[]>([]);

    
    // Fetch basket data from the backend when the component mounts
    // You can use axios or fetch to get the data and set it in state
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("No token found, user might not be logged in.");
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
    }, []);

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
    
    
    const updateQuantity = (product_id: number, quantity: number) => {
        const token = localStorage.getItem("token");
        axios
        .post("http://localhost:5000/basket/update", 
            { product_id, quantity},
            {
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

    return (
        <div className="container">
            <h1 className="text-center mt-5">Basket Page</h1>
             {data.map((item: any) => (
                <div key={item.product_id} className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <label className="card-text">Quantity: {item.quantity}</label>
                        <input type="number" value={item.quantity} 
                            onChange={(e) => {
                                const newQuantity = Number(e.target.value);
                                setData(prev => 
                                    prev.map( p => 
                                        p.product_id === item.product_id
                                        ? { ...p, quantity: newQuantity }
                                        : p
                                    )
                                )
                            }}/>
                        <button className="btn btn-primary" onClick={() => updateQuantity(item.product_id, item.quantity)}>update quantity</button>
                        <p className="card-text">Price: ${item.quantity * item.price}</p>
                        <button className="btn btn-danger" onClick={() => removeFromBasket(item.product_id)}>Remove from Basket</button>
                    </div>
                </div>
            ))}
            <div className="container">
                <h3 className="text-end">Total: ${data.reduce((total, item) => total + (item.quantity * item.price), 0)}</h3>
            </div>
        </div>
    );
}
export default BasketPage;