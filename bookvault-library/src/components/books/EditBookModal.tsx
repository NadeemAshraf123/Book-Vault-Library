import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateBook, closeEditModal } from "../../features/BookSlice";
import type { RootState, AppDispatch } from "../../app/Store";

const EditBookModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const modalRef = useRef<HTMLDivElement>(null);

  const { selectedBook, isEditModalOpen } = useSelector(
    (state: RootState) => state.books
  );

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
  });

  
  useEffect(() => {
    if (selectedBook) {
      setFormData({
        title: selectedBook.title,
        author: selectedBook.author,
        price: selectedBook.price.toString(),
        category: selectedBook.category,
      });
    }
  }, [selectedBook]);

  
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

  const validate = () => {
    const newErrors = {
      title: formData.title.trim() ? "" : "Title is required",
      author: formData.author.trim() ? "" : "Author is required",
      price:
        /^\d+(\.\d{1,2})?$/.test(formData.price) &&
        parseFloat(formData.price) > 0
          ? ""
          : "Valid price required",
      category: formData.category.trim() ? "" : "Category is required",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = () => {
    if (!selectedBook) return;
    if (!validate()) {
      toast.error("Please fix validation errors");
      return ;
    } 

    dispatch(
      updateBook({
        ...selectedBook,
        ...formData,
        price: parseFloat(formData.price),
      })
    );
    toast.success("Book updated successfully");
    dispatch(closeEditModal());
  };

  if (!isEditModalOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-book-title"
    >
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <div className="flex justify-between mb-2">
          <h2 id="edit-book-title" className="text-xl text-left font-bold">
            Edit Book
          </h2>
          <button
            onClick={() => dispatch(closeEditModal())}
            className="text-gray-500 cursor-pointer hover:text-gray-700 text-4xl"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {["title", "author", "price", "category"].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-sm text-left font-medium capitalize">
              {field}
            </label>
            <input
              name={field}
              value={formData[field as keyof typeof formData]}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 ${
                errors[field as keyof typeof errors] ? "border-red-500" : ""
              }`}
            />
            {errors[field as keyof typeof errors] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[field as keyof typeof errors]}
              </p>
            )}
          </div>
        ))}

        <div className="flex justify-between mt-6 space-x-2">
          <button
            onClick={() => dispatch(closeEditModal())}
            className="px-4 py-2 bg-gray-500 cursor-pointer hover:bg-gray-600 text-white rounded-lg"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white rounded-xl"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBookModal;
