export interface Product{
    product_id: number;
    name: string;
    description: string;
    stock: number;
    type: string;
    price: number;
}

export interface BasketItem {
    product_id: number;
    name: string;
    quantity: number;
    price: number;
}

// export interface OrderItem {
//     order_item_id: number;
//     quantity: number;
//     product_id: number;
// }