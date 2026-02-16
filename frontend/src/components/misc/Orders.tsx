import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Order, OrderItem } from "../types";


function Orders(){
    const [data, setData] = useState<Order[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("No token found, user might not be logged in.");
            return;
        }
        axios.get("http://localhost:5000/orders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => setData(res.data))
        .catch((err) => console.log(err))
    }, []);
    return(
        <div className="container py-5">
            <h1 className="text-center mt-5">Basket Page</h1>

            <div className="row">

                <div className="col-lg-8">
                {data.map((order) => (
                    <div
                        key={order.order_id}
                        className="btn btn-light border border-dark border-2 pt-5 pb-5 my-5 mx-auto rounded shadow-sm hover-shadow-lg"
                        style={{ width: "200px", height: "300px" }}
                        onClick={() => navigate(`/orders/${order.order_id}`)}
                    >   
                        <p>
                            <strong>Order ID:</strong> {order.order_id}
                        </p>
                        <ul>
                            {order.items.map(item => (
                                <li key={item.order_item_id}>
                                    {item.name} * {item.quantity} (${item.price})
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    </div>
    )
}

export default Orders;

