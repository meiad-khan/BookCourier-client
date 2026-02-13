import { useQuery } from "@tanstack/react-query";
import React, {  useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Components/Loading/Loading";
import { FaArrowLeft, FaArrowRight, FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router";

const AllBooks = () => {
  const axiosSecure = useAxiosSecure();
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState("price");
  const [order, setOrder] = useState("asc");
  const [searchText, setSearchText] = useState("");
  const limit = 6;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["all-books", currentPage, sort, order, searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-books?limit=${limit}&skip=${currentPage * limit}&sort=${sort}&order=${order}&search=${searchText}`,
      );
      return res.data;
    },
    keepPreviousData: true, // prevents UI flicker
  });

   const books = data?.result || [];
   const totalBooks = data?.total || 0;
   const totalPage = Math.ceil(totalBooks / limit);


  const handleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((item) => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  const handleSearch = () => {
    
  }

  const handleSort = () => {
    
  }

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="my-10">
      <h4 className="text-4xl text-center mt-9 mb-8">
        Available <span className="text-primary">Books</span>
      </h4>
      {/* search sort */}
      <div className="flex flex-wrap justify-between my-5">
        <div>
          <h2 className="text-3xl font-inter">({totalBooks}) Books</h2>
        </div>
        {/* search */}
        <div>
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              onChange={handleSearch}
              type="search"
              required
              placeholder="Search"
            />
          </label>
        </div>

        {/* sort */}
        <div>
          <select
            onChange={handleSort}
            defaultValue="Sort"
            className="select select-md"
          >
            <option disabled={true}>Sort</option>
            <option>price-asc</option>
            <option>price-desc</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <div
            key={book._id}
            className="relative card bg-base-100 shadow-md 
                                hover:shadow-xl transition duration-300 
                                hover:opacity-90 hover:scale-103"
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
                <Link to={`/all-books/${book._id}`} className="btn btn-primary btn-sm w-full">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-end gap-3.5 my-5">
        {currentPage > 0 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="btn"
          >
            <FaArrowLeft />
            Prev
          </button>
        )}
        {[...Array(totalPage).keys()].map((i) => (
          <button
            onClick={() => setCurrentPage(i)}
            key={i}
            className={`btn ${i == currentPage && "btn-primary"}`}
          >
            {i + 1}
          </button>
        ))}
        {currentPage < totalPage - 1 && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="btn"
          >
            Next
            <FaArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default AllBooks;
