import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateProductMutation, useDeleteProductMutation, useGetProductByIdQuery, useUploadProductImageMutation } from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApi";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductUpdate = () => {
    const params = useParams();
    const { data: productData } = useGetProductByIdQuery(params._id);
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [stock, setStock] = useState("");

    const navigate = useNavigate();

    const { data: categories = [] } = useFetchCategoriesQuery();
    const [uploadProductImage] = useUploadProductImageMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    useEffect(() => {
        if (productData) {
            setName(productData.name || "");
            setPrice(productData.price || "");
            setImage(productData.image || "");
            setDescription(productData.description || "");
            setQuantity(productData.quantity || "");
            setCategory(productData.category?._id || "");
            setBrand(productData.brand || "");
            setStock(productData.countInStock || "");
        }
    }, [productData]);

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    };

const handleUpdate = async (e) => {
    e.preventDefault();

    if (!image) {
        toast.error("Please upload an image before submitting."); 
        return;
    }

    try {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('quantity', quantity);
        formData.append('brand', brand);
        formData.append('countInStock', stock);

        const { data } = await updateProduct({ productId: params._id, formData });

        if (data.error) {
            toast.error(data.error);
        } else {
            toast.success(`Product successfully updated`);
            navigate("/admin/allproductslist");
        }
    } catch (error) {
        console.error(error.error);
        toast.error('Product Update failed, try again');
    }
};

const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const answer = window.confirm("Are you sure you want to delete the product?");
      if (!answer) return;
  
      await deleteProduct(params._id).unwrap();
      toast.success("Product deleted successfully");
      navigate("/admin/allproductslist");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting product.");
    }
  };
  
    if (!productData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container xl:mx-[9rem] sm:mx-[0]">
            <div className="flex flex-col md:flex-row">
                <AdminMenu />
                <div className="md:w-3/4 p-3">
                    <div className="h-12 ml-3">Update Product</div>
                    {image && (
                        <div className="text-center">
                            <img src={image} alt="product" className="block mx-auto max-h-[200px]" />
                        </div>
                    )}
                    <div className="mb-3 ml-3">
                        <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                            {image ? image.name : 'Upload Image'}
                            <input type="file" name="image" accept="image/*" onChange={uploadFileHandler} className={!image ? 'hidden' : 'text-white'} />
                        </label>
                    </div>
                    <div className="p-3">
                        <div className="flex flex-wrap">
                            <div className="one">
                                <label htmlFor="name">Name</label><br />
                                <input type="text" className="p-4 mb-3 w-[27rem] border rounded-lg bg-[#101011] text-white" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="two ml-10">
                                <label htmlFor="price block">Price</label><br />
                                <input type="number" className="p-4 mb-3 w-[27rem] border rounded-lg bg-[#101011] text-white" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div className="one">
                                <label htmlFor="quantity block">Quantity</label><br />
                                <input type="number" className="p-4 mb-3 w-[27rem] border rounded-lg bg-[#101011] text-white" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                            </div>
                            <div className="two ml-10">
                                <label htmlFor="brand block">Brand</label><br />
                                <input type="text" className="p-4 mb-3 w-[27rem] border rounded-lg bg-[#101011] text-white" value={brand} onChange={(e) => setBrand(e.target.value)} />
                            </div>
                        </div>
                        <label htmlFor="description" className="my-5">Description</label>
                        <textarea type="text" className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        <div className="flex justify-between">
                            <div>
                                <label htmlFor="stock block">Count in Stock</label><br />
                                <input type="text" className="p-4 mb-3 w-[27rem] border rounded-lg bg-[#101011] text-white" value={stock} onChange={(e) => setStock(e.target.value)} />
                            </div>
                        </div>
                        <label htmlFor="category">Category</label><br />
                        <select value={category} placeholder="Choose Category" className="p-4 mb-3 w-[27rem] border rounded-lg bg-[#101011] text-white" onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Choose Category</option>
                            {categories && categories.map((c) => (
                                <option key={c._id} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button onClick={handleUpdate} className="py-4 px-10 mt-5 ml-3 rounded-lg text-lg font-bold bg-green-600">Update</button>
                        <button onClick={handleDelete} className="py-4 px-10 mt-5 ml-3 rounded-lg text-lg font-bold bg-red-600">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductUpdate;
