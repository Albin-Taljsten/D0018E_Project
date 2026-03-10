import axios from "axios";
import { useState } from "react";
import { HOST, type Product } from "../types";

type ProductFormProps = {
    product?: Product | null
    onFinish: (updatedProduct?: Product) => void;
}

function ProductForm({product, onFinish}: ProductFormProps){
    const updateMode = !!product;
    
    const [formData, setFormData] = useState({
        name: product?.name ?? "",
        description: product?.description ?? "",
        price: product?.price ?? 0,
        stock: product?.stock ?? 0,
        type: product?.type ?? "",
        image: product?.image ?? ""
    })
    const handleChange = (e:any) => {
        const {name, value} = e.target;
        setFormData(prev => ({
           ...prev,
           [name]: (name === "price" || name === "stock") ? Math.max(0, Number(value)) : value
        }))
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if(!token) return;
        try {
            if(updateMode){
                const res = await axios.post(`http://${HOST}:5000/products/update/${product.product_id}`,
                formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                alert(res.data.message);
            }else{ 
                const res = await axios.post(`http://${HOST}:5000/products/add`,
                        formData,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                );
                alert(res.data.message);
            }
            onFinish()
        }catch (err: any) {
            const message = err.response?.data?.message || "Something went wrong";
            alert(message);
        }
    }
    return(
        <div className="col-12 col-md-6 col-lg-6">
            <form onSubmit={handleSubmit} className="card p-4">
                <div className="d-flex justify-content-center align-item-center mb-3 text-decoration-underline">
                    <h3 className="mb-3">{updateMode ? "Update product": "Add product"}</h3>            
                </div>
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input type="text" 
                           name="name"
                           className="form-control" 
                           placeholder="Enter name of product" 
                           value={formData.name}
                           onChange={handleChange}
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Description:</label>
                    <input type="text" 
                           name="description"
                           className="form-control" 
                           placeholder="Enter description" 
                           value={formData.description}
                           onChange={handleChange} 
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Price:</label>
                    <input type="number" 
                           name="price"
                           min={0}
                           className="form-control" 
                           placeholder="Enter price" 
                           value={formData.price}
                           onChange={handleChange}
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Stock:</label>
                    <input type="number" 
                           name="stock"
                           min={0}
                           className="form-control" 
                           placeholder="Enter how many in stock" 
                           value={formData.stock}
                           onChange={handleChange}
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Type:</label>
                    <input type="text" 
                           name="type"
                           className="form-control" 
                           placeholder="Enter what type of product" 
                           value={formData.type}
                           onChange={handleChange} 
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Image:</label>
                    <input type="text" 
                           name="image"
                           className="form-control" 
                           placeholder="Enter image path" 
                           value={formData.image}
                           onChange={handleChange}
                    />
                </div>
                <div className="mb-3 mt-3">
                    <button className="btn btn-dark"
                            type="submit"
                            disabled={!formData.name.trim() || 
                                      !formData.description.trim() || 
                                      formData.price === 0 || formData.stock === 0 || 
                                      !formData.type.trim() || 
                                      !formData.image.trim() }>
                                      {updateMode ? "Submit Update" : "Add Product"}
                    </button>
                </div>
            </form>
        </div>
    )
}
export default ProductForm