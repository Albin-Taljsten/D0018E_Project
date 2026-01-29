import type { Product } from "./GetProducts"

interface ProductInfoProps {
    product: Product;
}

function ProductInfo({ product }: ProductInfoProps){
    return(
        <div>
            <h1>Info</h1>
            <p><strong>ID:</strong> {product.id}</p>
            <p><strong>Name:</strong> {product.name}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>In stock:</strong> {product.stock}</p>
            <p><strong>Type:</strong> {product.type}</p>
        </div>
    )
}

export default ProductInfo