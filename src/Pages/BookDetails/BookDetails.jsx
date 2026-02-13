import React from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Components/Loading/Loading";
import { CgShoppingCart } from "react-icons/cg";
import { BiHeart } from "react-icons/bi";


const BookDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    data: book,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: async() => {
      const res = await axiosSecure.get(`/all-books/${id}`);
      return res.data;
    }
  });

  if (isLoading)
    return <Loading></Loading>
  if (isError)
    return (
      <div className="text-red-500 text-center mt-10">
        Error: {error.message}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-sm font-medium text-[#0F766E] hover:text-blue-500 transition-colors"
        >
          ← Back to All Books Page
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Column: Image Section */}
            <div className="md:w-1/2 bg-gray-200 flex items-center justify-center p-8">
              <img
                src={book.bookImage}
                alt={book.BookName}
                className="w-full max-w-sm h-auto object-cover rounded-md shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Right Column: Info Section */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  {/* Status Badge */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      book.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {book.bookStatus}
                  </span>
                  <p className="text-gray-400 text-sm italic">
                    Posted: {new Date(book.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <h1 className="text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
                  {book.bookName}
                </h1>
                <p className="text-xl text-slate-500 mb-6 italic">
                  by{" "}
                  <span className="text-[#0F766E] font-semibold">
                    {book.bookAuthor}
                  </span>
                </p>

                <div className="border-t border-b border-gray-100 py-6 mb-6">
                  <span className="text-3xl font-bold text-gray-900">
                    ${book.bookPrice}
                  </span>
                  <p className="mt-2 text-gray-500 leading-relaxed">
                    Dive into a world of knowledge and imagination. This title
                    has been carefully curated for our collection, ensuring
                    high-quality content for our readers. Whether you are
                    looking to expand your professional skills or escape into a
                    compelling narrative, this book offers a unique perspective
                    that resonates with readers of all backgrounds
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-[2] flex items-center justify-center bg-[#0F766E] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#0D635D] transition-all shadow-lg shadow-[#0F766E]/30 active:scale-95">
                  <CgShoppingCart className="w-5 h-5 mr-2" />
                  Order Now
                </button>
                <button className="flex-1 flex items-center justify-center border-2 border-slate-200 text-slate-600 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all active:scale-95">
                  <BiHeart className="w-5 h-5 mr-2" />
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
