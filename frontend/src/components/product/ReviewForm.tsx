import { useState } from "react"
import StarRating from "./StarRating"
import axios from "axios";
import { useParams } from "react-router-dom";
function ReviewForm(){
    const [review, setReview ] = useState(0);
    const [comment, setComment] = useState("");
    const [title, setTitle] = useState("");
    const { product_id } = useParams()
    const handleSubmit = (e: any) => {
        e.preventDefault();

        const reviewData = {
            title,
            review,
            comment,
        };

        console.log(reviewData)

        const token = localStorage.getItem("token");
        if(!token){
            return;
        }
        axios
        .post(`http://localhost:5000/review/submit/${product_id}`,
            {title, review, comment},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .catch((err) => console.log(err))
    }

    return(
        <div className="row">
            <div className="col-12 col-md-6 col-lg-6">
                <form onSubmit={handleSubmit} className="card p-4">
                    <div className="d-flex justify-content-between align-item-center mb-3">
                        <h5 className="mb-3">Leave a Review</h5>
                        <StarRating rating={review} setRating={setReview}/>
                    </div>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Title" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className="mb-3">
                        <label className="form-label">Comment</label>
                        <textarea
                            className="form-control"
                            rows={3}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={review === 0}
                    > Submit Review</button>
                </form>
            </div>
        </div>
    )
}

export default ReviewForm