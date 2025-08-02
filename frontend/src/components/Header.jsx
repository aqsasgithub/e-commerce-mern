import { useGetTopProductsQuery } from "../redux/api/productApiSlice"
import Loader from "./Loader";
import SmallProduct from "../Products/SmallProduct";
import ProductCarousel from "../Products/ProductCarousel";

const Header = () => {
    const {data, isLoading, error} = useGetTopProductsQuery();
    console.log(data)
        if(isLoading){
            return( <Loader />)
        }
        if(error){
            return <h1>ERROR</h1>
        }
  return (
    <>
    <div className="flex sm-flex-col xl:flex-row gap-8 justify-between">
      <div className="xl:block w-full xl:max-w-[50%]">
        <div className="grid grid-cols-2 gap-4">
          {data.map(product => (
            <SmallProduct key={product._id} product={product} />
          ))}
        </div>
      </div>
  
      <div className="w-full xl:max-w-[50%] mx-auto">
        <ProductCarousel />
      </div>
    </div>
  </>
  
  )
}

export default Header
