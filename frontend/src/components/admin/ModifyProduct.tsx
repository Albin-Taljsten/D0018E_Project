import axios from "axios";
import { useEffect, useState } from "react";
import { HOST, type Product } from "../types";
import RemoveModal from "./RemoveModal";
import ProductForm from "./ProductForm";


function ModifyProduct(){
    const [data, setData] = useState<Product[]>([]);
    const [item, setItem] = useState<Product | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [view, setView] = useState<"list" | "update">("list");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios
        .get(`http://${HOST}:5000/products`)
        .then((res) => setData(res.data))
        .catch((err) => console.log(err))
    }

    const handleRemoveModal = (product: Product) => {
        setItem(product);
        setShowModal(true);
    }

    const handleUpdate = (product: Product) => {
        setItem(product);
        setView("update");
    }
    const handleFinishUpdate = () => {
        fetchProducts();
        setItem(null);
        setView("list");
        
    }

    if(view ==="update" && item){
        return <ProductForm product={item} onFinish={handleFinishUpdate} />;
    }

    return(
        <div className="container mt-4 mb-4">
            <div className="row g-4 justify-content-center">
                {data.map((product) => (
                    <div className="col-md-4" key={product.product_id}>
                        <div className="card h-100 shadow-sm border rounded">
                            <div className="card-body d-flex flex-column">
                                <div className="row align-items-center mb-3">
                                        <div className="col-md-6 ">
                                            <h6>{product.name}</h6>
                                            <p className="mb-1"><small className="text-muted">Unit price: ${product.price}</small></p>
                                            <p className="mb-1"><small className="text-muted">Stock: {product.stock}</small></p>
                                            <p className="mb-1"><small className="text-muted">Price: ${product.price}</small></p>
                                        </div>
                                        <div className="col-md-6 d-flex justify-content-end">
                                            <img
                                                src={`http://${HOST}:5000/${product.image}`}
                                                alt={product.name}
                                                className="img-fluid rounded"
                                                style={{maxHeight: "100px", objectFit: "cover"}}
                                            />
                                        </div>
                                    </div>
                                <div className="mt-auto d-flex justify-content-between">
                                    <button type="button"
                                            className="btn btn-dark" 
                                            onClick={() => handleUpdate(product)}
                                    >
                                        Update Product
                                    </button>
                                    <button type="button"
                                            className="btn btn-dark" 
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
                onClose={() => setShowModal(false)}
            />
        </div>
    )
}
export default ModifyProduct;