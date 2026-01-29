import GetProducts from "../components/GetProducts"

function HomePage(){
    return(
        <div className="container p-5 my-5 border">
            <p className="h1 text-center">Home Page</p>
            <GetProducts />
        </div>
    )
}
export default HomePage