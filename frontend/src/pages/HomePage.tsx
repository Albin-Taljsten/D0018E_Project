import { useEffect } from "react";
import { HOST, type Product } from "../components";
import GetProducts from "../components/product/GetProducts"
import axios from "axios";

interface Props {
    setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
}

function HomePage({ setFavorites }: Props) {

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;
        
        const fetchFavorites = async () => {
            try {
                const res = await axios.get(`http://${HOST}:5000/favorites`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFavorites(res.data);
            } catch (err) {
                console.error("Failed to load favorites:", err);
            }
        }

        fetchFavorites();
    }, [setFavorites]);

    return(
        <div className="container-fluid p-5 my-2">
            <p className="h1 text-center">Home Page</p>
            <GetProducts />
        </div>
    )
}
export default HomePage