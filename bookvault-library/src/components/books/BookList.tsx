import { useEffect,useState, useRef } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, deleteBook, closeEditModal } from "../../features/BookSlice";
import type { RootState, AppDispatch } from "../../app/Store";
import { openEditModal } from "../../features/BookSlice";


const BookList = () => {

  const dispatch = useDispatch<AppDispatch>();
  const modalRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { data, loading } = useSelector((state: RootState) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

 useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target as Node)
    ) {
      dispatch(closeEditModal());
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [dispatch]);

const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchQuery(e.target.value.toLowerCase());
};

const filteredBooks = data.filter((book) => [book.title, book.author, book.category]
                      .join(" ")
                      .toLowerCase()
                      .includes(searchQuery)
                    );

const confirmDelete = (id: number) => {
  toast(
    ({ closeToast }) => (
      <div className="flex bg-white flex-col gap-2">
        <p className="bg-white">Are you sure you want to delete this book?</p>
        <div className="flex bg-white gap-2 justify-between">
          <button
            onClick={() => {
              dispatch(deleteBook(id))
                .unwrap()
                .then(() => toast.success("Book deleted successfully"))
                .catch(() => toast.error("Failed to delete book"));
              toast.dismiss();
            }}
            className="bg-red-600 text-white px-3 py-1 rounded-xl cursor-pointer hover:bg-red-700"
          >
            Yes, Delete
          </button>
          <button
            onClick={closeToast}
            className="bg-gray-300 text-black px-3 py-1 rounded-xl cursor-pointer hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    ),
    {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      draggable: false,
    }
  );
};



  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between items-center">
      <h2 className="text-2xl text-center font-bold mb-4">📚 Book List</h2>
        <input 
           type="text"
           placeholder="Search by little, author, or category"
           value={searchQuery}
           onChange={handleSearchChange}
           className="border px-3 py-2 focus:outline-none focus:border-blue-500 rounded-lg w-full max-w-xs"
           />

      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4">Author</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Category</th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book.id} className="border-t text-left">
              <td className="py-2 px-4">{book.title}</td>
              <td className="py-2 px-4">{book.author}</td>
              <td className="py-2 px-4">${book.price}</td>
              <td className="py-2 px-4">{book.category}</td>
              <td className="py-2 px-4 text-center">
                <button
                  onClick={() => dispatch(openEditModal(book))}
                   className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white px-3 py-1 rounded-lg mr-2"
                  >
                    Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 cursor-pointer text-white px-3 py-1 rounded-lg"
                  onClick={() => confirmDelete(book.id!)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
