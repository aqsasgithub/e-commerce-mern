import { useState } from "react"
import { Link } from "react-router-dom"
import Ratings from "./Ratings"
import { useGetTopProductsQuery } from "../redux/api/productApiSlice"
import SmallProduct from "./SmallProduct"
import Loader from "../components/Loader"

const ProductsTab = ({loadingProductsReview, userInfo, submitHandler, rating, setRating, comment, setComment, product}) => {
  const {data, isLoading} = useGetTopProductsQuery();

  const [activeTab, setActiveTab] = useState(1);
  if(isLoading){
    return <Loader />;
  };
  
  const handleTabClick = (tabNumber)=>{
    setActiveTab(tabNumber);
  }
  return <>
    <div className="flex flex-col md:flex-row">
    <section className="flex flex-wrap gap-2 mb-4">
  <div className={`cursor-pointer text-lg px-4 py-2 rounded ${activeTab === 1 ? "font-bold bg-gray-700 text-white" : "bg-gray-800 text-gray-400"}`} onClick={() => handleTabClick(1)}>
    Write Your Review
  </div>
  <div className={`cursor-pointer text-lg px-4 py-2 rounded ${activeTab === 2 ? "font-bold bg-gray-700 text-white" : "bg-gray-800 text-gray-400"}`} onClick={() => handleTabClick(2)}>
    All Reviews
  </div>
  <div className={`cursor-pointer text-lg px-4 py-2 rounded ${activeTab === 3 ? "font-bold bg-gray-700 text-white" : "bg-gray-800 text-gray-400"}`} onClick={() => handleTabClick(3)}>
    Related Products
  </div>
</section>

        <section>
            {activeTab === 1 &&(
                <div className="mt-4">
                    {userInfo ?(
                        <form onSubmit={submitHandler}>
                            <div className="my-2">
                                <label htmlFor="rating" className="block text-xl mb-2">Rating</label>
                                <select id="rating" required value={rating} onChange={e => setRating(e.target.value)} className="p-2 border rounded-lg xl:w-[40rem] text-white bg-gray-800">
                                    <option value="1">Inferior</option>
                                    <option value="2">Decent</option>
                                    <option value="3">Great</option>
                                    <option value="4">Excellent</option>
                                    <option value="5">Exceptional</option>
                                </select>
                            </div>
                            <div className="my-2">
                                <label htmlFor="comment" className="block text-xl mb-2">
                                    Comment
                                </label>
                                <textarea required value={comment} id="comment" rows={3} onChange={e => setComment(e.target.value)} className="p-2 border rounded-lg xl:w-[40rem] text-black" ></textarea>
                            </div>
                            <button type="submit" disabled={loadingProductsReview} className="bg-pink-600 text-white py-2 px-4 rounded-lg">Submit</button>
                        </form>
                    ) :(
                        <p> Please <Link className="text-pink-600 font-semibold" to={'/login'}>Sign in</Link> to write a review </p>
                    )}
                </div>
            )}
        </section>
        <section>
  {activeTab === 2 && (
    <div className="mt-4">
      {!product?.reviews?.length ? (
        <p>No Reviews</p>
      ) : (
        product.reviews.map((review) => (
          <div
            key={review._id}
            className="bg-[#1A1A1A] p-4 rounded-lg xl:ml-[2rem] sm:ml-0 xl:w-[50rem] sm:w-[24rem] mb-5"
          >
            <div className="flex justify-between">
              <strong className="font-bold">{review.name}</strong>
              <p className="text-[#808080]">
                {review.createdAt.substring(0, 10)}
              </p>
            </div>
            <p className="my-4">{review.comment}</p>
            <Ratings value={review.rating} />
          </div>
        ))
      )}
    </div>
  )}
        </section>
        <section>
          {activeTab === 3 && (
            <section className="ml-[4rem] flex flex-wrap">
              {!data ? (
                <Loader />
              ) : (
                data.map((product)=>(
                  <div key={product._id}>
                    <SmallProduct product={product} />
                  </div>
                ))
              )}
            </section>
          )}
        </section>
        
    </div> </>
}

export default ProductsTab
