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
        <div className="container-fluid p-0" style={{ overflow: 'hidden' }}>
            <img 
                src="/images/Skiing1-copy.jpeg"
                style={{
                    width: '100%',
                    height: '100vh',
                    objectFit: 'cover',
                    display: 'block',
                }}
                alt="Skiing1"
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: '-10vh',
                    left: 0,
                    width: '100%',
                    height: '200px',
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
                    pointerEvents: 'none',
                }}
            ></div>
            
            <GetProducts />
        </div>
    )
}
export default HomePage