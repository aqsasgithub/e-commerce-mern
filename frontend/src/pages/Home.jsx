import {Link, useParams} from 'react-router-dom';
import { productApiSlice, useGetProductsQuery } from '../redux/api/productApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Header from '../components/Header';
import SmallProduct from '../Products/SmallProduct';
import Product from '../Products/Product';

const Home = () => {
    const {keyword} = useParams();
    const {data, isLoading, isError} = useGetProductsQuery({keyword})
  return (
    // <Header />
    <>{!keyword ? <Header /> : null}
    {isLoading? (<Loader />) : isError? (<Message variant="danger">
        {isError?.data.message || isError.error}
    </Message>) : (
        <>
        <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-20 mt-10">
  <h1 className="text-3xl mb-4 md:mb-0">

                Special Products
            </h1>
            <Link to='/shop' className='bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem]'>
            Shop
            </Link>
            </div>
            <div>
            <div className="flex justify-center flex-wrap mt-[2rem]">
                {data.products.map((product)=>(
                    <div key={product._id}>
                    <Product product={product}></Product>
                    </div>
                ))}
            </div>
        </div>
        </>
    )}
    </>)
} 

export default Home;