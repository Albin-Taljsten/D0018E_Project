import type { Product } from "../types";

type UpdateProps = {
    product: Product | null;
}
//fixa product form, återanvänd samma som till addProduct
function UpdateProduct({product}: UpdateProps){
    return(
        <>
        UpdateProduct
        </>
    )
}
export default UpdateProduct