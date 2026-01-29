import axios from "axios";
import { useEffect, useState } from "react";

interface Product{
    id: number;
    name: string;
    description: string;
    stock: string;
    type: string;
}
function GetProducts(){
    const [data, setData] = useState<Product[]>([]);

    useEffect(() => {
        axios.get("http://localhost:5000/products")
        .then((res) => {
            setData(res.data)
        })
        .catch((err) => console.log(err))
    }, []);
    return(
        <div className="container border">
            {data.map((product) => {
                return (
                    <div key={product.id} className="container-fluid p-5 my-5 border  ">
                        <p><strong>ID:</strong> {product.id}</p>
                        <p><strong>Name:</strong> {product.name}</p>
                        <p><strong>Description:</strong> {product.description}</p>
                        <p><strong>In stock:</strong> {product.stock}</p>
                        <p><strong>Type:</strong> {product.type}</p>
                    </div>
                )
            })}
        </div>
    
    )
}

export default GetProducts