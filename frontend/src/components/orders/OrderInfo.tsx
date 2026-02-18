import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Order } from "../types";
import axios from "axios";


function OrderInfo(){
    const [order, setOrder] = useState<Order | null>(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/LoginPage");
            return;
        }
        if(!id) return;
        
        axios
        .get(`http://localhost:5000/orders/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => { console.log("ORDER: ", res.data),setOrder(res.data)})
        .catch((err) => console.log(err))
    }, [id]);

    if(order == null)return <p>Order not found</p>
    return (
        <div className="container py-5">
            <h1 className="text-center mt-5">Order</h1>

            <div className="row">

                <div className="col-lg-8">
                    
                        <div  className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h5>Order: {order.order_id}</h5>
                                <p><small>Order Date: {order.order_date.split("T")[0]}</small></p>
                                {order.items.map((product) => (
                                    <div key={product.order_item_id} className="row align-items-center mb-3">
                                        <div className="col-md-6 ">
                                            <h6>{product.name}</h6>
                                            <p className="mb-1"><small className="text-muted">Unit price: ${product.price}</small></p>
                                            <p className="mb-1"><small className="text-muted">Quantity: {product.quantity}</small></p>
                                            <p className="mb-1"><small className="text-muted">Total: ${product.quantity * product.price}</small></p>
                                        </div>
                                        <div className="col-md-6 d-flex justify-content-end">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="img-fluid rounded"
                                                style={{maxHeight: "300px", objectFit: "cover"}}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                   
                </div>

                <div className="col-lg-4">
                    <div className="card shadow-sm" style={{position: "sticky", top: "70px"}}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-3">
                                <h5 className="mb-0">Total:</h5>
                                <h5 className="mb-0">${order.total_price}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderInfo