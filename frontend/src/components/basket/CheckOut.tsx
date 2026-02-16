import type { BasketItem } from "../types";

type CheckoutProps = {
    item: BasketItem[];
    show: boolean;
    onClose: () => void;
}

function CheckOut({ item, show, onClose }: CheckoutProps){
    if(!show) return null;

    return(
    <>
        <div className="modal show d-block" tabIndex={-1}>
            {/* Return modal Thanks for ordering and list all items */}
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Your purchase is ordered!</h4>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <ul>
                            {item.map(item => 
                                <li key={item.product_id}>
                                    {item.name} quantity: {item.quantity} price: {item.price}
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" onClick={onClose}>close</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal-backdrop show"></div>
    </>
);
}

export default CheckOut;