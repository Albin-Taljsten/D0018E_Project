import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface Product{
    product_id: number;
    name: string;
    description: string;
    stock: number;
    type: string;
    price: number;
}
function GetProducts(){
    const [data, setData] = useState<Product[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
        .get("http://localhost:5000/products")
        .then((res) => setData(res.data))
        .catch((err) => console.log(err))
    }, []);
    // const token = localStorage.getItem("token");

    // axios.get("http://localhost:5000/products", {
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //     },
    // }).then((res) => setData(res.data))
    // .catch((err) => console.log(err));

    return (
        <div className="container d-flex flex-wrap justify-content-start gap-3 border border-dark border-2 pt-1 pb-1 my-5 mx-auto rounded">
            {data.map((product) => (
                <button
                    key={product.product_id}
                    onClick={() => navigate(`/products/${product.name}`)}
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