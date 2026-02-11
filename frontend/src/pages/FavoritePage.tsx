import { FavoriteItem, type Product } from "../components";

interface Props {
    favorites: Product[];
    setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
}

function FavoritePage({ favorites, setFavorites }: Props) {
    if (favorites.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <h4>No favorites yet <i className="bi bi-heart-full fs-4"></i></h4>
            </div>
        );
    }

    const handleRemove = (productId: number) => {
        setFavorites(prev => prev.filter(p => p.product_id !== productId));
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