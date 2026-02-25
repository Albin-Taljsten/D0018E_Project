import { type Dispatch, type SetStateAction } from "react"

interface Props {
    rating: number,
    setRating: Dispatch<SetStateAction<number>>
}

function StarRating({rating, setRating}: Props){
    return(
        <div className="d-flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <i
                    key={star}
                    className={`bi ${
                        star <= rating
                        ? "bi-star-fill text-warning"
                        : "bi-star text-secondary"
                    }`}
                    style={{fontSize: "1.5rem", cursor: "pointer"}}
                    onClick={() => setRating(star)}
                />
            )
            
            )}
        </div>
    )
}

export default StarRating