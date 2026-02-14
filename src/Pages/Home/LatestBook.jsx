import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Loading from "../../Components/Loading/Loading";
import { Link, useNavigate } from "react-router";

const LatestBook = () => {

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  const { data: latestBooks = [], isLoading } = useQuery({
    queryKey: ["latest-books"],
    queryFn: async () => {
      const res = await axiosSecure.get("/latest-books");
      return res.data;
    },
  });

  const handleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((item) => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <section className="py-10 px-4 md:px-10 border-2 border-primary rounded-2xl">
      <h4 className="text-5xl font-bold text-center mb-12">
        Latest <span className="text-primary">Books</span>
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {latestBooks.map((book) => (
          <div
            key={book._id}
            onClick={() => navigate(`/book-details/${book._id}`)}
            className="relative card bg-base-100 shadow-md 
                       hover:shadow-xl transition duration-300 
                       hover:opacity-90 hover:scale-103 cursor-pointer"
          >
            {/* Wishlist Icon */}
            <button
              onClick={() => handleWishlist(book._id)}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow"
            >
              {wishlist.includes(book._id) ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-500" />
              )}
            </button>

            {/* Image */}
            <figure className="h-64 overflow-hidden">
              <img
                src={book.bookImage}
                alt={book.bookName}
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h3 className="card-title text-lg font-bold">{book.bookName}</h3>

              <p className="text-sm text-gray-500">by {book.bookAuthor}</p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-primary">
                  ${book.bookPrice}
                </span>

                <span
                  className={`badge ${
                    book.bookStatus === "published"
                      ? "badge-success"
                      : "badge-warning"
                  }`}
                >
                  {book.bookStatus}
                </span>
              </div>

              <div className="card-actions mt-4">
                <Link
                  to={`/book-details/${book._id}`}
                  className="btn btn-primary btn-sm w-full"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestBook;
