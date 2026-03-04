import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {HOST, type Comments } from "../types";

function Reviews(){
    const [data, setData] = useState<Comments[]>([]);
    const {product_id} = useParams();
    useEffect(() => {
        if(product_id){
            axios
                .get(`http://${HOST}:5000/review/${product_id}`)
                .then((res) => setData(res.data))
                .catch((err) => console.log(err));
        }
    }, [product_id]);
    return(
        <div className="row">

            <div className="col-12 col-md-6 col-lg-6">

                
                {data.map((comment) => (
                    <div className="card p-3 mb-3" key={comment.comment_id}>
                        <div className="d-flex justify-content-between align-item-center mb-3">
                            <h5 className="mb-0">{comment.title}</h5>
                            <div className="d-flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <i
                                        key={star}
                                        className={`bi ${
                                            star <= Number(comment.review)
                                            ? "bi-star-fill text-warning"
                                            : "bi-star text-secondary"
                                        }`}
                                        style={{fontSize: "1.2rem"}}
                                    />
                                )
                                
                                )}
                            </div>
                        </div>
                        <p className="mb-2">{comment.comment}</p>
                        <div className="d-flex justify-content-between">
                            <small className="text-muted">{comment.date.split("T")[0]}</small>
                            <small className="text-muted">{comment.name}</small>
                        </div>
                    </div>
                ))}
                
            </div>
        </div>
    )
}
export default Reviews