import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../../features/BookSlice";
import type { AppDispatch } from "../../app/Store";

const AddBookForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.author) return alert("Fill all fields");

    dispatch(
      addBook({
        title: formData.title,
        author: formData.author,
        price: Number(formData.price),
        category: formData.category,
      })
    );

    setFormData({ title: "", author: "", price: "", category: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg mb-6 flex gap-3 flex-wrap">
      <input
        type="text"
        name="title"
        placeholder="Book Title"
        value={formData.title}
        onChange={handleChange}
        className="border p-2 rounded w-[180px]"
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={formData.author}
        onChange={handleChange}
        className="border p-2 rounded w-[180px]"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="border p-2 rounded w-[120px]"
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="border p-2 rounded w-[160px]"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Book
      </button>
    </form>
  );
};

export default AddBookForm;
