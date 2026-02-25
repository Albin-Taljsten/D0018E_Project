import { GetProducts } from "../components";

function CategoryChildren() {
    return (
        <div className="container-fluid p-0" style={{ overflow: 'hidden' }}>
            <div className="container">
                <h4 className="text-center text-dark fw-semibold ms-5 me-5 mt-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Explicabo aliquid tenetur dolore ullam, quasi maxime quisquam fuga laborum velit cum officia dolores magni, 
                    quas cumque temporibus quis placeat dolorum ducimus!
                </h4>
            </div>
            <GetProducts />
        </div>
    );
}

export default CategoryChildren;