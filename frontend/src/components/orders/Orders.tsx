import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HOST, type Order } from "../types";


function Orders(){
    const [data, setData] = useState<Order[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("No token found, user might not be logged in.");
            return;
        }
        axios.get(`http://${HOST}:5000/orders`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => setData(res.data))
        .catch((err) => console.log(err))
    }, []);
    return(
        <div className="container py-5">
            <h1 className="text-center mt-5">Purchase History</h1>

            <div className="containter">

                <div className="row g-3 justify-content-center flex-wrap gap-3">
                    {data.map((order) => (
                        <button
                            key={order.order_id}
                            className="btn btn-light border border-dark border-2 text-start p-3 shadow mb-3 position-relative overflow-hidden"
                            onClick={() => navigate(`/orders/${order.order_id}`)}
                            style={{ cursor: "pointer", backgroundColor: "white", width: "400px", height: "200px", transition: "transform 0.2s ease-in-out"}}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        >   
                            <p><strong>Order ID:</strong> {order.order_id}</p>
                            <p><strong>Order Date:</strong> {order.order_date.split("T")[0]}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                            <p><strong>Total Price:</strong> ${order.total_price}</p>
                        </button>
                    ))}
            </div>
        </div>
    </div>
    )
}

export default Orders;
