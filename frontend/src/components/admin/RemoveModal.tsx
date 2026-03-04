import axios from "axios";
import { HOST, type Product } from "../types";

type RemoveProps = {
    product: Product | null;
    showModal: boolean;
    onClose: () => void;
}

function RemoveModal({ product, showModal, onClose}: RemoveProps){
    
    if(!showModal || !product) return null;

    const DeleteFromDb = async () => {
        const token = localStorage.getItem("token");
        if(!token) return null;

        try{
            axios.delete(`http://${HOST}:5000/products/delete/${product.product_id}`,
            {headers: { Authorization: `Bearer ${token}`}
            })
            onClose();
        }catch(err: any){
            const message = err.response?.data?.message || "Someting went wrong";
            console.log(message)
        }

    }
    return(
        <div className="modal show d-block" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Remove Product</h4>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <ul>
                                <p>Are you sure you want to remove product with product id: {product.product_id}</p>
                            </ul>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-danger" onClick={() => DeleteFromDb()}>Remove product</button>
                            <button type="button" className="btn btn-dark" onClick={onClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default RemoveModal