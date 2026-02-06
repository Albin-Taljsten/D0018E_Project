import axios from "axios";
import { useEffect, useState } from "react";
import ProductInfo from "./ProductInfo";

export interface Product{
    id: number;
    name: string;
    description: string;
    stock: string;
    type: string;
}
function GetProducts(){
    const [data, setData] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    useEffect(() => {
        axios.get("http://localhost:5000/products")
        .then((res) => {
            setData(res.data)
        })
        .catch((err) => console.log(err))
    }, []);
    return(
        <div className="containter d-flex flex-wrap justify-content-start gap-3 border border-dark border-2 pt-1 pb-1 my-5 mx-auto rounded">
            {data.map((product) => {
                return (
                    <button key={product.id} onClick={() => setSelectedProduct(product)} type="button" className="btn btn-light border border-dark border-2 pt-5 pb-5 my-5 mx-auto  rounded  shadow-sm hower-shadow-lg" style={{width: '200px', height: '300px'}}>
                        <p><strong>Name:</strong> {product.name}</p>
                    </button>
                )
            })}
            {selectedProduct && <ProductInfo product={selectedProduct} />}
        </div>
    
    )
}

export default GetProducts