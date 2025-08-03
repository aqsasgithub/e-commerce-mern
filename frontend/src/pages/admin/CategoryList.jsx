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
import './CategoryList.css'; // ✅ Import external CSS for responsive styles

const CategoryList = () => {
  const { data: categories, refetch } = useFetchCategoriesQuery();

  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) return toast.error('Category name is required');

    try {
      const result = await createCategory({ name }).unwrap();
      toast.success(`${result.name} is created`);
      setName("");
      refetch();
    } catch (error) {
      toast.error('Creating category failed, try again.');
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updatingName || !selectedCategory?._id) return toast.error('Provide valid data');

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: { name: updatingName },
      }).unwrap();

      toast.success(`${result.name} is updated`);
      setSelectedCategory(null);
      setUpdatingName('');
      setModalVisible(false);
      refetch();
    } catch (error) {
      toast.error('Updating category failed, try again.');
    }
  };

  const handleDeleteCategory = async (e) => {
    e.preventDefault();
    if (!selectedCategory?._id) return toast.error('No category selected');

    try {
      await deleteCategory(selectedCategory._id).unwrap();
      toast.success(`${selectedCategory.name} is deleted`);
      setSelectedCategory(null);
      setModalVisible(false);
      refetch();
    } catch (error) {
      toast.error('Category deletion failed, try again.');
    }
  };

  return (
    <div className="category-container">
      <AdminMenu />
      <div className="category-content">
        <div className="category-title">Manage Categories</div>
        <CategoryForm
          value={name}
          setValue={(e) => setName(e.target.value)}
          handleSubmit={handleCreateCategory}
        />
        <hr className="my-4" />
        <div className="category-buttons-wrapper">
          {categories?.map((category) => (
            <button
              key={category._id}
              className="category-button"
              onClick={() => {
                setModalVisible(true);
                setSelectedCategory(category);
                setUpdatingName(category.name);
              }}
            >
              {category.name}
            </button>
          ))}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updatingName}
            setValue={(e) => setUpdatingName(e.target.value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
