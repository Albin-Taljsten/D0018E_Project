import axios from "axios";
import { useState } from "react";
import { HOST } from "../types";

function AddProduct(){
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        type: "",
        image: ""
    })
    const handleChange = (e:any) => {
        const {name, value} = e.target;
        setFormData(prev => ({
           ...prev,
           [name]: value 
        }))
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if(!token) return;
        try {
            const res = await axios.post(`http://${HOST}:5000/products/add`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                alert(res.data.message);

                setFormData({
                    name: "",
                    description: "",
                    price: 0,
                    stock: 0,
                    type: "",
                    image: ""
                })
        } catch (err: any) {
            const message = err.response?.data?.message || "Something went wrong";
            alert(message);
        }
    }
    return (
        <div className="col-12 col-md-6 col-lg-6">
            <form onSubmit={handleSubmit} className="card p-4">
                <div className="d-flex justify-content-between align-item-center mb-3">
                    <h5 className="mb-3">Add product</h5>            
                </div>
                <div className="mb-3 mt-3">
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
                                        Add product
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct