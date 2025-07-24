import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useGetProductsQuery, useGetProductByIdQuery, useGetProductDetailsQuery, useAllProductsQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation, useAddReviewMutation, useGetTopProductsQuery, useGetNewProductsQuery, useUploadProductImageMutation} from '../../redux/api/productApiSlice.js';
import {useFetchCategoriesQuery} from '../../redux/api/categoryApi.js';
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu.jsx";

const ProductList =()=>{
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [brand, setBrand] = useState('');
    const [stock, setStock] = useState('0');
    const [imageURL, setImageURL] = useState('');
    const navigate = useNavigate();
    const {data:categories} = useFetchCategoriesQuery();
    const [uploadProductImage] = useUploadProductImageMutation();
    const [createProduct] = useCreateProductMutation()
    
const uploadFileHandler= async(e)=>{
    const formData = new FormData()
    formData.append('image', e.target.files[0]);
    try {
        const res = await uploadProductImage(formData).unwrap();
        toast.success(res.message);
        setImage(res.image);
        setImageURL(res.image);
    } catch (error) {
        toast.error(error?.data?.message || error.error);
    }
}
const submitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
        toast.error("Please upload an image before submitting.");
        return;
    }

    try {
        const productData = new FormData();
        productData.append('image', image);
        productData.append('name', name);
        productData.append('description', description);
        productData.append('price', price);
        productData.append('category', category);
        productData.append('quantity', quantity);
        productData.append('brand', brand);
        productData.append('countInStock', stock);

        const response = await createProduct(productData);

        if (response?.data) {
            const { data } = response;
            if (data.error) {
                toast.error('Product creation failed, Try again');
            } else {
                toast.success(`${data.name} is created`);
                navigate("/");
            }
        } else {
            toast.error('Product creation failed, Try again');
        }
    } catch (error) {
        console.error('Submission error:', error);
        toast.error('Product creation failed, Try again');
    }
}

return <div className="container xl:mx-[9rem] sm:mx-[0]">
<div className="flex flex-col md:flex-row">
<AdminMenu />
<div className="md:w-3/4 p-3">
<div className="h-12 ml-3">Create Product</div>
{imageURL && (<div className="text-center">
<img src={imageURL} alt="product" className="block mx-auto max-h-[200px]" />
</div>) }
<div className="mb-3 ml-3">
    <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
        {image ? image.name : 'Upload Image'}
        <input type="file" name="image" accept="image/*" onChange={uploadFileHandler} className={!image ? 'hidden': 'text-white'} />
    </label>
</div>

<div className="p-3">
    <div className="flex flex-wrap">
        <div className="one">
            <label htmlFor="name">Name</label> <br />
            <input type="text" className="p-4 mb-3 w-[27rem] border rounded-lg bg-[#101011] text-white" value={name} onChange={(e)=>setName(e.target.value)} />
        </div>
        <div className="two ml-10">
            <label htmlFor="price block">Price</label> <br />
            <input type="number" className="p-4 mb-3 w-[27rem] border rounded-lg bg-[#101011] text-white" value={price} onChange={(e)=>setPrice(e.target.value)} />
        </div>
        <div className="one">
            <label htmlFor="quantity block">Quantity</label> <br />
            <input type="number" className="p-4 mb-3 w-[27rem] border rounded-lg bg-[#101011] text-white" value={quantity} onChange={(e)=>setQuantity(e.target.value)} />
        </div>
        <div className="two ml-10">
            <label htmlFor="brand block">Brand</label> <br />
            <input type="text" className="p-4 mb-3 w-[27rem] border rounded-lg bg-[#101011] text-white" value={brand} onChange={(e)=> setBrand(e.target.value)} />
        </div>
    </div>
    <label htmlFor="description" className="my-5">Description</label>
    <textarea type='text' className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
    <div className="flex justify-between">
        <div>
            <label htmlFor="stock block"> Count in Stock</label> <br />
            <input type="text" className="p-4 mb-3 w-[27rem] border rounded-lg bg-[#101011] text-white" value={stock} onChange={(e)=>setStock(e.target.value)} />
        </div>
    </div>
    <label htmlFor="category">Category</label> <br />
    <select
    placeholder="Choose Category"
    className="p-4 mb-3 w-[27rem] border rounded-lg bg-[#101011] text-white"
    onChange={(e) => setCategory(e.target.value)}
>
    <option value="">Choose Category</option>
    {categories && categories.map((c) => (
        <option key={c._id} value={c._id}>
            {c.name}
        </option>
    ))}
</select>
            </div>
            <button onClick={submitHandler} className="py-4 px-10 mt-5 ml-3 rounded-lg text-lg font-bold bg-pink-600">Submit</button>
            </div>
            
        </div>
    </div>
    };

export default ProductList;
