import axios from "axios";
import { useEffect, useState } from "react";
import { HOST, type Product } from "../types";
import RemoveModal from "./RemoveModal";
import UpdateProduct from "./UpdateProduct"


function ModifyProduct(){
    const [data, setData] = useState<Product[]>([]);
    const [item, setItem] = useState<Product | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios
        .get(`http://${HOST}:5000/products`)
        .then((res) => setData(res.data))
        .catch((err) => console.log(err))
    }, []);

    const handleRemoveModal = (product: Product) => {
        setItem(product);
        setShowModal(true);
    }

    return(
        <div className="container mt-4 mb-4">
            <div className="row g-4 justify-content-center">
                {data.map((product) => (
                    <div className="col-md-4" key={product.product_id}>
                        <div className="card h-100 shadow-sm border rounded">
                            <div className="card-body d-flex flex-column">
                                
                                <h5 className="card-title mb-2">{product.product_id}</h5>
                                <p className="card-text mb-1"><strong>Product Name: </strong>{product.name}</p>
                                <p className="card-text mb-1"><strong>Price: </strong>{product.price}</p>
                                <p className="card-text mb-1"><strong>In stock: </strong>{product.stock}</p>
                                <p className="card-text mb-3"><strong>Type: </strong>{product.type}</p>
                                <div className="mt-auto d-flex justify-content-between">
                                    <button type="button"
                                            className="btn btn-dark" 
                                            
                                    >
                                        Update Product
                                    </button>
                                    <button type="button"
                                            className="btn btn-danger" 
                                            onClick={() => handleRemoveModal(product)}
                                    >
                                        Remove Product
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <RemoveModal
                product={item}
                showModal={showModal}
                onClose={() => setShowModal(false)} />
    
        </div>
    )
}
export default ModifyProduct;