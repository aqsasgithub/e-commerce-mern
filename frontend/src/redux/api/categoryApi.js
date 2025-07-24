import { apiSlice } from "./apiSlice.js";
import { CATEGORY_URL } from "../constants.js";

export const categorySlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createCategory: builder.mutation({
            query: (newCategory) =>({
                url: `${CATEGORY_URL}`,
                method: "POST",
                body: newCategory,
            }),
            providesTags: ['Category'],
            keepUnusedDataFor: 5,
        }),
       
        updateCategory: builder.mutation({
            query: ({ categoryId, updatedCategory }) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: "PUT",
                body: updatedCategory,
            }),
            invalidatesTags: (result, error, { categoryId }) => [{ type: 'Category', id: categoryId }],
        }),
        
            
        deleteCategory: builder.mutation({
            query: (id)=>({
                url: `${CATEGORY_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Category'],
        }),

        fetchCategories: builder.query({
            query: ()=>({
                url: `${CATEGORY_URL}/categories`
            }),
            providesTags: ['Category'],
        }),
    }),
})

export const {useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation, useFetchCategoriesQuery} = categorySlice