import { useParams } from "react-router-dom"
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import axios from "axios";
import ReviewForm from "./ReviewForm";

import { HOST, type BasketItem, type Product } from "../types";

interface Props {
    favorites: Product[];
    setFavorites: Dispatch<SetStateAction<Product[]>>
}

function ProductInfo({ favorites, setFavorites }: Props) {
    const { product_id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [data, setData] = useState<BasketItem[]>([]);
    const [ isInBasket, setIsInBasket ] = useState(false);

    useEffect(() => {
        if (product_id) {
            axios
                .get(`http://${HOST}:5000/products/${product_id}`)
                .then((res) => setProduct(res.data))
                .catch((err) => console.log(err));
        }

    }, [product_id]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token || !product?.product_id) return;

        axios.get(`http://${HOST}:5000/basket/get/${product.product_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            
            setIsInBasket(res.data.length > 0);
        })
        .catch((err) => console.log(err))
        
    }, [product]);

    if (!product) return <p className="mt-5 text-center">Loading...</p>

    const isFavorited = favorites.some(
        p => p.product_id === product.product_id
    );

    const addToFavorite = async () => {
        if (!product) return;
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in to add favorites.");
            return;
        }

        try {
            await axios.post(
                `http://${HOST}:5000/favorites/add/${product.product_id}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setFavorites(prev => [...prev, product]);
        } catch (err) {
            console.error(err);
            alert("Error adding to favorites.");
        }
    };

    const removeFromFavorite = async () => {
        if (!product) return;
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in to add favorites.");
            return;
        }

        try {
            await axios.delete(
                `http://${HOST}:5000/favorites/remove/${product.product_id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setFavorites(prev => 
                prev.filter(p => p.product_id !== product.product_id)
            );
        } catch (err) {
            console.error(err);
            alert("Error removing from favorites.");
        }
    };

    const addToBasket = (product_id: number, new_quantity: number = 1) => {
        const quantity = Math.max(1, new_quantity)
        const token = localStorage.getItem("token");

        setData(prev => prev.map(item => item.product_id === product_id ? {...item, quantity} : item));

        axios
        .post(`http://${HOST}:5000/basket/add/${product_id}`,
            { quantity }, 
            {
            headers: {
                Authorization: `Bearer ${token}`
            }
        
        })
        .then(()=> setIsInBasket(true))
        .catch((err) => console.log(err));
    };

    return (
        <div className="container mt-5">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet"></link>
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
                    {product.stock === 0 && (
                        <div className="alert alert-danger">
                            Product out of stock
                        </div>
                    )}

                    <button 
                        className="btn btn-dark mt-3"
                        onClick={() => addToBasket(product.product_id, 1)}
                        disabled={product.stock === 0 || isInBasket}
                    >
                        {isInBasket ? "Product in basket" : "Add to basket"}
                    </button>

                    <hr />

                    <button
                        className={`btn ${isFavorited ? "btn-danger" : "btn-outline-danger"}`}
                        onClick={isFavorited ? removeFromFavorite : addToFavorite}
                    >
                        <i className={`bi ${
                            isFavorited ? "bi-heart" : "bi-heart-fill"
                        } fs-4`} />
                    </button>
                </div>
            </div>
            <ReviewForm/>
        </div>
    )
}

export default ProductInfo;