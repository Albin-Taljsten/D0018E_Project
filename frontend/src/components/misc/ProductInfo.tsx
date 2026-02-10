import { useParams } from "react-router-dom"
import type { Product } from "./GetProducts"
import { useEffect, useState } from "react";
import axios from "axios";

function ProductInfo() {
    const { productName } = useParams();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (productName) {
            axios
                .get(`http://localhost:5000/products/${productName}`)
                .then((res) => setProduct(res.data))
                .catch((err) => console.log(err));
        }
    }, [productName]);

    if (!product) return <p className="mt-5 text-center">Loading...</p>

    return (
        <div className="container mt-5">
            <div className="row align-items-start">

                {/* LEFT: Image */}
                <div className="col-md-6 mb-4">
                    <div
                        className="border rounded d-flex align-items-center justify-content-center"
                        style={{height: "400px", backgroundColor: "#f8f9fa"}}
                    >
                        {/* Placeholder image for now */}
                        <span className="text-muted">Product Image</span>

                        {/* Later you can just do:
                        <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="img-fluid rounded"
                        />
                        */}
                    </div>
                </div>

                {/* RIGHT: Product info */}
                <div className="col-md-6">
                    <h1 className="mb-3">{product.name}</h1>

                    <p className="text-muted">{product.description}</p>

                    <hr />

                    <p><strong>Type: </strong>{product.type}</p>
                    <p><strong>Stock: </strong>{product.stock}</p>

                    <h3 className="mt-4">${product.price}</h3>

                    <button className="btn btn-dark mt-3">
                        Add to basket
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductInfo;