import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateBook } from "../../features/BookSlice";
import type { AppDispatch } from "../../app/Store";

interface EditBookModalProps {
  book: any;
  onClose: () => void;
}

const EditBookModal = ({ book, onClose }: EditBookModalProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        price: book.price,
        category: book.category,
      });
    }
  }, [book]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      updateBook({
        id: book.id,
        updatedData: {
          title: formData.title,
          author: formData.author,
          price: Number(formData.price),
          category: formData.category,
        },
      })
    );
    onClose(); // close modal after update
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[350px]">
        <h2 className="text-xl font-bold mb-4">Edit Book</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Update
            </button>
            <button onClick={onClose} type="button" className="bg-gray-400 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;
