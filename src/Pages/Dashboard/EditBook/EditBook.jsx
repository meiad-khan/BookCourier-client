import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import Swal from "sweetalert2";

const EditBook = () => {

  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bookName: "",
    bookAuthor: "",
    bookPrice: "",
    bookStatus: "published",
    bookImage: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch book data
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axiosSecure.get(`/all-books/${id}`);
        setFormData({
          bookName: res.data.bookName,
          bookAuthor: res.data.bookAuthor,
          bookPrice: res.data.bookPrice,
          bookStatus: res.data.bookStatus,
          bookImage: res.data.bookImage,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, axiosSecure]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.patch(`/all-books/${id}`, formData);
      if (res.data.modifiedCount) {
        Swal.fire("Updated!", "Book updated successfully.", "success");
        navigate("/dashboard/my-books");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update book", "error");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen p-6 bg-[#F4EDE4] dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-[#0F766E] dark:text-[#F4EDE4]">
          Edit Book
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Book Name */}
          <div>
            <label className="label text-gray-700 dark:text-gray-200">
              Book Name
            </label>
            <input
              type="text"
              name="bookName"
              value={formData.bookName}
              onChange={handleChange}
              className="input w-full"
              required
            />
          </div>

          {/* Author */}
          <div>
            <label className="label text-gray-700 dark:text-gray-200">
              Author
            </label>
            <input
              type="text"
              name="bookAuthor"
              value={formData.bookAuthor}
              onChange={handleChange}
              className="input w-full"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="label text-gray-700 dark:text-gray-200">
              Price
            </label>
            <input
              type="number"
              name="bookPrice"
              value={formData.bookPrice}
              onChange={handleChange}
              className="input w-full"
              required
              min={0}
            />
          </div>

          {/* Status */}
          <div>
            <label className="label text-gray-700 dark:text-gray-200">
              Status
            </label>
            <select
              name="bookStatus"
              value={formData.bookStatus}
              onChange={handleChange}
              className="select w-full"
            >
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="label text-gray-700 dark:text-gray-200">
              Book Image URL
            </label>
            <input
              type="text"
              name="bookImage"
              value={formData.bookImage}
              onChange={handleChange}
              className="input w-full"
              required
            />
          </div>

          {/* Preview Image */}
          {formData.bookImage && (
            <div className="mt-4">
              <p className="text-gray-700 dark:text-gray-200 mb-2">Preview:</p>
              <img
                src={formData.bookImage}
                alt={formData.bookName}
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
          )}

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              type="submit"
              className="btn bg-[#0F766E] text-white hover:bg-[#0D635D] dark:bg-[#0F766E] dark:hover:bg-[#0D635D]"
            >
              Update Book
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard/my-books")}
              className="btn btn-outline dark:text-gray-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
