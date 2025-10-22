import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, deleteBook } from "../../features/BookSlice";
import type { RootState, AppDispatch } from "../../app/Store";
import { openEditModal } from "../../features/BookSlice";

const BookList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📚 Book List</h2>
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
          {data.map((book) => (
            <tr key={book.id} className="border-t">
              <td className="py-2 px-4">{book.title}</td>
              <td className="py-2 px-4">{book.author}</td>
              <td className="py-2 px-4">${book.price}</td>
              <td className="py-2 px-4">{book.category}</td>
              <td className="py-2 px-4 text-center">
                <button
                  onClick={() => dispatch(openEditModal(book))}
                   className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => dispatch(deleteBook(book.id!))}
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
