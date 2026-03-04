import { HOST, type Product } from "../components";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CategoryGloves(){
    const [data, setData] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 25;
    const navigate = useNavigate();

    useEffect(() => {
        const type = "Ski Gloves"
        axios
        .get(`http://${HOST}:5000/products/filter?type=${encodeURIComponent(type)}`)
        .then((res) => setData(res.data))
        .catch((err) => console.log(err))
    }, []);

    const totalPages = Math.ceil(data.length / productsPerPage);

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = data.slice(startIndex, endIndex);

    return (
        <>
            <div className="container-fluid d-flex flex-wrap justify-content-center gap-3 mt-4">
                {currentProducts.map((product) => (
                    <div 
                        key={product.product_id} 
                        className="col-12 col-sm-6 col-md-2 mb-4 d-flex justify-content-center"
                    >
                        <div 
                            className="card text-center" 
                            style={{ width: '12rem', cursor: 'pointer' }}
                            onClick={() => navigate(`/products/${product.product_id}`)}
                        >
                            <img 
                                src={`http://${HOST}:5000/${product.image}`}
                                className="card-img-top"
                                style={{ height: '10rem', objectFit: 'cover' }}
                                alt={`${product.image}`} 
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

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
        </>
    );
}

export default CategoryGloves;