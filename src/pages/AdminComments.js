import { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { ToastContainer, toast } from 'react-toastify';

const AdminComments = () => {
    const axiosPrivate = useAxiosPrivate();
    const [usersList, error, loading, refetch] = useAxios({
        axiosInstance: axiosPrivate,
        method: 'GET',
        url: 'user/handle',
        requestConfig: {
          'Content-Language': 'en-US',
        },
    });
    const [selectedComment, setSelectedComment] = useState(null);
    const [getComment, setselectComment] = useState(null);
    const [isLoadingCommnets, setLoading] = useState(false);
    const [isError, setError] = useState("");
    const [comments, setComments] = useState([]);
  
    const handleDeleteUser = async(selectedComment) => {
      const toast_id = toast.loading("Please wait...")
      const data = {
        id:selectedComment._id,
      }
      try {
      const response = await axiosPrivate.delete(`recipe`,
      {
            headers: { "Content-Type": "application/json" },
            data: {
              id: selectedComment._id
            },
            withCredentials: true,
       });
        toast.update(toast_id, 
          { render: `${selectedComment._id} recipe has been deleted.`,
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: "error", isLoading: false });     
          await refetch();
          setSelectedComment(null);
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

    useEffect(() => {
        if(selectedComment != null)
        {
            const fetchCommentsUser = async() => {
                try {
                    const response = await axiosPrivate.get(`comments/admin/${selectedComment.username}`);
                    setComments(response.data);
                    console.log(response.data);
                } catch (error) {
                    setError(error.message);
                }
                finally
                {
                    setLoading(false);
                }
            }
            fetchCommentsUser();
        }
    },[selectedComment])
  
    const handleUserClick = (user) => {
      setSelectedComment(user);
    };
  
    return (
      <section className="p-4">
        {loading && <p>Loading...</p>}
        {!loading && error && <p>{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div className='row-span-2'>
            <h2 className="text-lg font-bold mb-4">User List</h2>
            <div className="bg-white rounded shadow overflow-hidden">
              {usersList &&
                usersList.map((user) => (
                  <div
                    key={user._id}
                    className={`cursor-pointer px-4 py-2 border-b border-gray-200 ${
                        selectedComment && selectedComment._id === user._id
                        ? 'bg-blue-100'
                        : ''
                    }`}
                    onClick={() => handleUserClick(user)}
                  >
                      <div className='flex justify-between'>
                      <p className="text-gray-700">{user.username}</p>
  
                      </div>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4 order-2">Comments List of User Details</h2>
            <div className="bg-white rounded shadow p-4">
              {selectedComment ? 
                (comments.length > 0 ? 
                    (
                        comments.map(comment => (
                            <div>
                                <div onClick={() => setselectComment(comment)} className={`cursor-pointer px-4 py-2 border-b border-gray-200 ${getComment && getComment._id === comment._id
                        ? 'bg-blue-100'
                        : ''}`}>
                                    <p className="text-gray-700">Recipe Name: {comment.recipe[0].recipeName}</p>
                                    <p className="text-gray-700">Comment: {comment.comment.comment}</p>
                                </div> 
                        </div>
                        ))
                    )
                    : 
                    (   
                    <p>User have no comments</p>
                    )
                ) 
              : 
              (
                <p>Please select a Recipe to view details</p>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4">Actions</h2>
            <div className="bg-white rounded shadow p-4">
              {selectedComment ? (
                <div className='flex flex-col w-fit'>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDeleteUser(selectedComment)}
                  >
                    Delete Recipe
                  </button>
                </div>
              ) : (
                <p>Please select a user to perform actions</p>
              )}
            </div>
          </div>
        </div>
        <ToastContainer/>
      </section>
    );
}

export default AdminComments