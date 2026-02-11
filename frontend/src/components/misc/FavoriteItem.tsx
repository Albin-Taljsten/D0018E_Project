import type { Product } from "../types";

interface Props {
    product: Product;
    onRemove: (productId: number) => void;
}

function FavoriteItem({ product, onRemove }: Props) {
    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <div className="d-flex gap-3 align-item-start">

                    {/* Image (placeholder atm) */}
                    <div
                        className="bg-light d-flex align-items-center justify-content-center rounded"
                        style={{ width: "100px", height: "100px" }}
                    >
                        <span className="text-muted small">IMG</span>
                    </div>

                    {/* Replace the image placeholder with this when images have been added to the db
                    <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="rounded"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                    */}

                    {/* Product info */}
                    <div className="flex-grow-1">
                        <h5 className="card-title mb-1">{product.name}</h5>
                        <p className="card-text text-muted mb-2">{product.description}</p>

                        <div className="d-flex gap-3 text-muted small mb-2">
                            <span>{product.type}</span>
                            <span>Stock: {product.stock}</span>
                        </div>

                        <strong>${product.price}</strong>

                        <hr />

                        {/* Remove button */}
                        <button 
                            className="btn btn-outline-danger btn-sm mt-2"
                            onClick={() => onRemove(product.product_id)}
                        >
                            <span className="fs-6 d-flex align-items-center">Remove</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default FavoriteItem