import { useNavigate } from "react-router-dom";
import { FavoriteItem, type Product } from "../components";
import { useEffect } from "react";
import axios from "axios";

interface Props {
    favorites: Product[];
    setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
}

function FavoritePage({ favorites, setFavorites }: Props) {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/LoginPage");
            return;
        }

        const fetchFavorites = async () => {
            try {
                const res = await axios.get("http://localhost:5000/favorites", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFavorites(res.data);
            } catch (err) {
                console.log(err);
                alert("Failed to load favorites.");
            }
        }

        fetchFavorites();

    }, [navigate, setFavorites]);

    const handleRemove = async (productId: number) => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/LoginPage");
            return;
        }

        try {
            await axios.delete(`http://localhost:5000/favorites/remove/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setFavorites(prev => prev.filter(p => p.product_id !== productId));
        } catch (err) {
            console.error(err);
            alert("Failed to remove favorite.");
        }
    }

    if (favorites.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <h4>No favorites yet <i className="bi bi-heart-full fs-4"></i></h4>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Your favorites</h1>

            <div className="d-flex flex-column gap-3">
                {favorites.map(product => (
                    <FavoriteItem 
                        key={product.product_id}
                        product={product}
                        onRemove={handleRemove}
                    />
                ))}
            </div>
        </div>
    );
}

export default FavoritePage