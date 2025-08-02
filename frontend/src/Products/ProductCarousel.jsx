import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Message from "../components/Message";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import moment from "moment";
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from 'react-icons/fa';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  console.log(products);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
<div className="mb-4 block w-full max-w-[56rem] mx-auto px-4">
{isLoading ? null : error ? (
        <Message variant="danger">{error?.data?.message || error.message}</Message>
      ) : products && products.length > 0 ? (
<div className="w-full max-w-[56rem] mx-auto">
<Slider {...settings}>
            {products.map(({ image, _id, name, price, description, brand, createdAt, numReviews, rating, quantity, countInStock }) => (
              <div key={_id}>
               <img
  src={`${import.meta.env.VITE_API_BASE}${image}`}
  alt={name}
  className="w-full rounded-lg object-cover aspect-[16/9]"
/>

<div className="flex flex-col md:flex-row justify-between gap-4 max-w-full mt-5">
                  <div className="one">
                    <h2>{name}</h2>
                    <p>Rs {price}</p> <br /> <br />
                    <p className="w-[25rem]">{description.substring(0, 170)}...</p>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between gap-4 max-w-full">
                  <div className="one">
                      <h1 className="flex items-center mb-6 w-[15rem]">
                        <FaStore className="mr-2 text-white" /> Reviews: {numReviews}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[15rem]">
                        <FaClock className="mr-2 text-white" /> Added: {moment(createdAt).fromNow()}
                      </h1>
                      {/* <h1 className="flex items-center mb-6 w-[15rem]">
                        <FaStar className="mr-2 text-white" /> Brand: {brand}
                      </h1> */}
                    </div>
                    {/* <div className="two">
                      <h1 className="flex items-center mb-6 w-[10rem]">
                        <FaStar className="mr-2 text-white" /> Ratings: {Math.round(rating)}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[10rem]">
                        <FaShoppingCart className="mr-2 text-white" /> Quantity: {quantity}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[15rem]">
                        <FaBox className="mr-2 text-white" /> In Stock: {countInStock}
                      </h1>
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <Message variant="info">No products found</Message>
      )}
    </div>
  );
  
};

export default ProductCarousel;

