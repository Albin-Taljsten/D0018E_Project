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

    if (!product) return <p>Loading...</p>

    return (
        <div className="container mt-5">
            <h1>{product.name}</h1>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
            <p><strong>Type:</strong> {product.type}</p>
        </div>
    )
}

export default ProductInfo;