import GetProducts from "../components/misc/GetProducts"

function HomePage(){
    return(
        <div className="container p-5 my-5 border border-dark border-2">
            <p className="h1 text-center">Home Page</p>
            <GetProducts />
        </div>
    )
}
export default HomePage