import Category from "../models/categoryModel.js";
import asyncHandler from '../middlewares/asyncHandler.js';

const createCategory = asyncHandler(async (req, res)=>{
    try {
        const {name} = req.body;

        if(!name){
            return res.json({error: "Name is required"});
        }
        const existingCategory = await Category.findOne({name});

        if(existingCategory){
            return res.json({error: "Already exists"})
            }

            const category = await new Category({name}).save();
            return res.json(category);
    
        } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});

const updateCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        const { categoryId } = req.params;

        const category = await Category.findOne({ _id: categoryId });
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        category.name = name;
        const updatedCategory = await category.save();
        res.json(updatedCategory);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const removed = await Category.findByIdAndDelete(req.params.categoryId);
        if (!removed) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.json({ message: "Category deleted successfully", category: removed });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


const listCategories = asyncHandler(async (req, res)=>{
    try {
        const allCategories = await Category.find({});
        res.status(200).json(allCategories);
    } catch (error) {
        console.error(error);
        return res.status(404).json(error.message);
    }
});

const getCategory = asyncHandler(async (req, res)=>{
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
});


export {createCategory, updateCategory, deleteCategory, listCategories, getCategory};