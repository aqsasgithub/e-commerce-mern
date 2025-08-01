import { useState } from "react";
import { toast } from "react-toastify";
import {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useFetchCategoriesQuery,
} from '../../redux/api/categoryApi.js';
import CategoryForm from '../../components/CategoryForm.jsx';
import Modal from "../../components/Modal.jsx";
import AdminMenu from "./AdminMenu.jsx";

const CategoryList = () => {
    const { data: categories, refetch } = useFetchCategoriesQuery();
    console.log(categories);

    const [name, setName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [updatingName, setUpdatingName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        if (!name) {
            toast.error('Category name is required');
            return;
        }

        try {
            const result = await createCategory({ name }).unwrap();
            if (result.error) {
                toast.error(result.error);
            } else {
                setName("");
                toast.success(`${result.name} is created`);
                refetch(); // Call refetch here
            }
        } catch (error) {
            console.error(error);
            toast.error('Creating category failed, try again.');
        }
    };

    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        if (!updatingName) {
            toast.error('Category name is required');
            return;
        }
        if (!selectedCategory || !selectedCategory._id) {
            toast.error('No category selected for update');
            return;
        }

        try {
            const result = await updateCategory({
                categoryId: selectedCategory._id,
                updatedCategory: { name: updatingName },
            }).unwrap();

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(`${result.name} is updated`);
                setSelectedCategory(null);
                setUpdatingName('');
                setModalVisible(false);
                refetch(); // Call refetch here
            }
        } catch (error) {
            console.error(error);
            toast.error(error);
        }
    };

    const handleDeleteCategory = async (e) => {
        e.preventDefault();
        if (!selectedCategory || !selectedCategory._id) {
            toast.error('No category selected for deletion');
            return;
        }

        try {
            const result = await deleteCategory(selectedCategory._id).unwrap();
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(`${selectedCategory.name} is deleted`);
                setSelectedCategory(null);
                setModalVisible(false);
                refetch(); // Call refetch here
            }
        } catch (error) {
            console.error(error);
            toast.error('Category deletion failed, try again.');
        }
    };

    return (
        <div className="ml-[10rem] flex flex-col md:flex-row">
            <AdminMenu />
            <div className="md:w-3/4 p-3">
                <div className="h-12">Manage Categories</div>
                <CategoryForm value={name} setValue={(e) => setName(e.target.value)} handleSubmit={handleCreateCategory} />
                <br />
                <hr />
                <div className="flex flex-wrap">
                    {categories?.map((category) => (
                        <div key={category._id}>
                            <button
                                className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                                onClick={() => {
                                    setModalVisible(true);
                                    setSelectedCategory(category);
                                    setUpdatingName(category.name);
                                }}
                            >
                                {category.name}
                            </button>
                        </div>
                    ))}
                </div>
                <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                    <CategoryForm value={updatingName} setValue={(e) => setUpdatingName(e.target.value)} handleSubmit={handleUpdateCategory} buttonText="Update" handleDelete={handleDeleteCategory} />
                </Modal>
            </div>
        </div>
    );
};

export default CategoryList;
