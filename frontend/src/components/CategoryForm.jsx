const CategoryForm = ({value, setValue, handleSubmit, buttonText="Submit", handleDelete})=>{
    return <div className="p-3">
        <form action="" onSubmit={handleSubmit} className="space-y-3">
            <input type="text" className="py-3 px-4 border rounded-lg w-full" placeholder="Write Category Name" value={value} onChange={setValue} />
            <div className="flex justify-between">
                <button className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">{buttonText}</button>
                {handleDelete && (
                    <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">Delete</button>
                )}
            </div>
        </form>
    </div>
}

export default CategoryForm;