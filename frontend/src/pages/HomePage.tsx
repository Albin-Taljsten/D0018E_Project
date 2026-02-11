import GetProducts from "../components/misc/GetProducts"

function HomePage(){
    return(
        <div className="container-fluid p-5 my-2">
            <p className="h1 text-center">Home Page</p>
            <GetProducts />
        </div>
    )
}
export default HomePage