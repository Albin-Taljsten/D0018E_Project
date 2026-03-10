import axios from "axios";
import { useEffect, useState } from "react";
import { HOST, type Product } from "../types";
import RemoveModal from "./RemoveModal";
import ProductForm from "./ProductForm";


function ModifyProduct(){
    const [data, setData] = useState<Product[]>([]);
    const [item, setItem] = useState<Product | null>(null);
    const [view, setView] = useState<"list" | "update">("list");
    const [modal, setModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 50;

    const totalPages = Math.ceil(data.length / productsPerPage);

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = data.slice(startIndex, endIndex);

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
        setModal(true);
    }
    const handleRemovedProduct = () => {
        fetchProducts();
        setItem(null);
        setModal(false);
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
                {currentProducts.map((product) => (
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
                                                className="card-img-top"
                                                style={{ height: '10rem', objectFit: 'cover' }}
                                                alt={`${product.image}`} 
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
            {modal && <RemoveModal product={item} onFinish={handleRemovedProduct}  onClose={() => setModal(false)} />}
            { /* Pagination buttons */ }
            <div className="d-flex justify-content-center mt-4 mb-5 gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        className={`btn ${page === currentPage ? 'btn-dark' : 'btn-outline-dark'}`}
                        onClick={() => {
                            setCurrentPage(page);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    )
}
export default ModifyProduct;