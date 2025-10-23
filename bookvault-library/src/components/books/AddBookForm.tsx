import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
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

  const validateForm = () => {
    const { title, author, price, category } = formData;
    if ( !title.trim()) {
      toast.error("Title is required");
      return false;
    }
    if (!author.trim()) {
      toast.error("Author is required");
      return false;
    }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      toast.error("Valid priceis required");
      return false;
    }
    if (!category.trim()) {
      toast.error("Category is required");
      return false;
    }
    return true;
  };



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return ;
    
    dispatch(
      addBook({
        title: formData.title,
        author: formData.author,
        price: Number(formData.price),
        category: formData.category,
      })
    );

    toast.success("Book added successfully");
    setFormData({ title:"", author: "" , price: "", category: ""});
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-transparent shadow-md rounded-lg mb-6 flex gap-3 flex-wrap">
      <input
        type="text"
        name="title"
        placeholder="Book Title"
        value={formData.title}
        onChange={handleChange}
        className="border px-2 py-0 rounded-lg w-[180px]"
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={formData.author}
        onChange={handleChange}
        className="border px-2 py-0 rounded-lg w-[180px]"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="border px-2 py-0 rounded-lg w-[120px]"
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="border px-2 py-0 rounded-lg w-[160px]"
      />
      <button
        type="submit"
        className="bg-green-600 cursor-pointer text-white hover:text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        Add Book
      </button>
    </form>
  );
};

export default AddBookForm;
