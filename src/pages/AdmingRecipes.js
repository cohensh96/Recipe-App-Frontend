import {  useState } from 'react';
import useAxios from '../hooks/useAxios';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { ToastContainer, toast } from 'react-toastify';

const AdmingRecipes = () => {
  const axiosPrivate = useAxiosPrivate();
  const [recipes, error, loading, refetch] = useAxios({
    axiosInstance: axiosPrivate,
    method: 'GET',
    url: 'recipe',
    requestConfig: {
      'Content-Language': 'en-US',
    },
  });
  const [selectedRecipe, setSelectedUser] = useState(null);


  const handleDeleteUser = async(selectedRecipe) => {
    const toast_id = toast.loading("Please wait...")
    try {
    //eslint-disable-next-line
    const response = await axiosPrivate.delete(`recipe`,
    {
          headers: { "Content-Type": "application/json" },
          data: {
            id: selectedRecipe._id
          },
          withCredentials: true,
     });
      toast.update(toast_id, 
        { render: `${selectedRecipe.recipeName} recipe has been deleted.`,
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error", isLoading: false });     
        await refetch();
        setSelectedUser(null);
    } catch (error) {
      toast.update(toast_id, 
        { render: `${error}`,
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored", type: "error", isLoading: false });   
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <section className="p-4">
      {loading && <p>Loading...</p>}
      {!loading && error && <p>{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className='row-span-2'>
          <h2 className="text-lg font-bold mb-4">Recipes List</h2>
          <div className="bg-white rounded shadow overflow-hidden">
            {recipes &&
              recipes.map((recipe) => (
                <div
                  key={recipe._id}
                  className={`cursor-pointer px-4 py-2 border-b border-gray-200 ${
                    selectedRecipe && selectedRecipe._id === recipe._id
                      ? 'bg-blue-100'
                      : ''
                  }`}
                  onClick={() => handleUserClick(recipe)}
                >
                    <div className='flex justify-between'>
                    <p className="text-gray-700">{recipe.recipeName}</p>
                    <p className="text-gray-700">{recipe.author}</p>

                    </div>
                </div>
              ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4 order-2">Recipe Details</h2>
          <div className="bg-white rounded shadow p-4">
            {selectedRecipe ? (
              <div>
                <div>
                  <p className="text-gray-700">Recipe Name: {selectedRecipe.recipeName}</p>
                  <p className="text-gray-700">Recipe Author: {selectedRecipe.author}</p>
                  <p className="text-gray-700">Description: {selectedRecipe.recipeDescription}</p>
                  <p className="text-gray-700">Comments: {selectedRecipe.recipeComments}</p>
                </div>
              </div>
            ) : (
              <p>Please select a Recipe to view details</p>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4">Actions</h2>
          <div className="bg-white rounded shadow p-4">
            {selectedRecipe ? (
              <div className='flex flex-col w-fit'>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDeleteUser(selectedRecipe)}
                >
                  Delete Recipe
                </button>
              </div>
            ) : (
              <p>Please select a recipe to perform actions</p>
            )}
          </div>
        </div>
      </div>
      <ToastContainer/>
    </section>
  );
};

export default AdmingRecipes;
