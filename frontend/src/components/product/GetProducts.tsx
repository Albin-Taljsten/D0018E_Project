import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types";


function GetProducts(){
    const [data, setData] = useState<Product[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
        .get("http://localhost:5000/products")
        .then((res) => setData(res.data))
        .catch((err) => console.log(err))
    }, []);
    return (
        <div className="container-fluid d-flex flex-wrap justify-content-start gap-3">
            {data.map((product) => (
                <button
                    key={product.product_id}
                    onClick={() => navigate(`/products/${product.product_id}`)}
                    type="button"
                    className="btn btn-light border border-dark border-2 pt-5 pb-5 my-5 mx-auto rounded shadow-sm hover-shadow-lg"
                    style={{ width: "200px", height: "300px" }}
                >   
                    <p>
                        <strong>Name:</strong> {product.name}
                    </p>
                </button>
            ))}
        </div>
    );
}

export default GetProducts;