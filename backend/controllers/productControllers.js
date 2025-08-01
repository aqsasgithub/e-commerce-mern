import asyncHandler from "../middlewares/asyncHandler.js";
import Product from '../models/productModel.js';

const addProduct = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, category, quantity, brand } = req.fields;

        // const image = req.file?.path.replace(/\\/g, "/");

        switch(true){
            case !name:
                return res.json({error: "Name is required"});
            case !description:
                return res.json({error: "Description is required"});
            case !price:
                return res.json({error: "Price is required"});
            case !category:
                return res.json({error: "Category is required"});
            case !quantity:
                return res.json({error: "Quantity is required"});
            case !brand:
                return res.json({error: "Brand is required"});
        }

        const product = new Product({ ...req.fields});
        await product.save();
        res.json(product);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: error.message });
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    try {
        console.log("req.params.id:", req.params.id);
        console.log("req.fields:", req.fields);
        console.log("req.files:", req.files);
        
        const { name, description, price, category, quantity, brand } = req.body;
        const { image } = req.files || {};

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = price;
        if (category) product.category = category;
        if (quantity) product.quantity = quantity;
        if (brand) product.brand = brand;

        if (image) {
            const imagePath = image.path;
            product.image = imagePath;
        }

        await product.save();

        res.json({ message: "Product updated successfully", product });
    } catch (error) {
        console.error("Error updating product:", error.message);
        res.status(500).json({ message: error.message });
    }
});


const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    // await product.deleteOne();        
    res.status(200).json({ message: "Product deleted successfully" });
});


const fetchProducts = asyncHandler(async (req, res)=>{
    try {
        const pageSize = 6;
        const keyword = req.query.keyword ? {name : {$regex: req.query.keyword, $options: "i"}} : {};
        const count= await Product.countDocuments({...keyword});
        const products = await Product.find({...keyword}).limit(pageSize);
        res.json({
            products,
            page: 1,
            pages: Math.ceil(count/pageSize),
            hasMore: false
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"Server Error"});
    }
});

const fetchProductById = asyncHandler(async(req, res)=>{
    try {
        const product = await Product.findById(req.params.id);

        if(product){
            return res.json(product);
        } else{
            res.status(404)
            throw new Error("Product not found");
        }
    } catch (error) {
        console.error(error);
        res.status(404).json({error: "Product not found"});
    }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({})
            .populate('category')
            .limit(12)
            .sort({ createdAt: -1 });

        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }
        console.log(products);
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


const addProductReview = asyncHandler(async (req, res) => {
    try {
        console.log("Incoming review request:");
        console.log("Params ID:", req.params.id);
        console.log("Body:", req.body);

        const { rating, comment } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            const alreadyReviewed = product.reviews.find(
                r => r.user.toString() === req.user._id.toString()
            );

            if (alreadyReviewed) {
                return res.status(400).json({ message: "Product already reviewed" });
            }

            const review = {
                name: req.user.username,
                rating: Number(rating),
                comment,
                user: req.user._id,
            };

            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating =
                product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

                await product.save();
                res.status(201).json({message: "Review added"});
            } else{
                return res.status(400).json({ message: "Product already reviewed" });
            }
        } catch (error) {
            console.error(error);
            res.status(400).json(error.message);
        }
    })


const fetchTopProducts = asyncHandler(async (req, res)=>{
    try {
        const products = await Product.find({}).sort({rating: -1}).limit(4);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
});

const fetchNewProducts = asyncHandler(async(req, res)=>{
    try {
        const products = await Product.find({}).sort({_id:-1}).limit(5);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
})

const filterProducts = asyncHandler(async (req, res)=>{
    try {
        const {checked, radio} = req.body

        let args = {}
        if(checked.length > 0) args.category = checked;
        if(radio.length) args.price = {$gte: radio[0], $lte: radio[1]}

        const products = await Product.find(args)
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Server Error"})
    }
})

export { addProduct, updateProduct, deleteProduct, fetchProducts, fetchProductById, fetchAllProducts, addProductReview, fetchTopProducts, fetchNewProducts, filterProducts };
