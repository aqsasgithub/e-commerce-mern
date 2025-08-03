import { useGetTopProductsQuery } from "../redux/api/productApiSlice"
import Loader from "./Loader";
import SmallProduct from "../Products/SmallProduct";
import ProductCarousel from "../Products/ProductCarousel";
import './Home.css'

const Header = () => {
    const {data, isLoading, error} = useGetTopProductsQuery();
    console.log(data)
    console.log("BASE_URL ENV:", import.meta.env.VITE_API_BASE);

        if(isLoading){
            return( <Loader />)
        }
        if(error){
            return <h1>ERROR</h1>
        }
  return (
    <>
    <div className="home-layout-container flex flex-col md:flex-row gap-8 justify-between px-4 w-full max-w-7xl mx-auto">
      
      {/* Left Section - Small Products Grid */}
      <div className="w-full md:w-1/2">
        <div className="grid grid-cols-2 gap-4">
          {data.map(product => (
            <SmallProduct key={product._id} product={product} />
          ))}
        </div>
      </div>
  
      {/* Right Section - Carousel */}
      <div className="w-full md:w-1/2">
        <ProductCarousel />
      </div>
  
    </div>
  </>
  
  
  )
}

export default Header
