import { Link, useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../redux/api/productApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Header from '../components/Header';
import Product from '../Products/Product';

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
       <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 px-4 md:px-20 mt-10">            <h1 className="text-3xl mb-4 md:mb-0 text-center md:text-left">
              Special Products
            </h1>

            <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-lg py-2 px-6 md:px-10 ml-[0.5rem] md:w-auto w-[100px] text-center mt-4 md:mt-0"
            >
              Shop
            </Link>
          </div>
          </div>

          <div className="flex justify-center flex-wrap mt-[2rem]">
            {data.products.map((product) => (
              <div key={product._id} className="m-4">
                <Product product={product} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
