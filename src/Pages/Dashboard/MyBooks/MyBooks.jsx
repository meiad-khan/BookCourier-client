import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";

const MyBooks = () => {

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    data: books = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-books", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books?email=${user?.email}`); 
      return res.data;
    },
  });

  console.log('books data', books);

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="text-red-500 text-center mt-10">
        Error: {error.message}
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-[#F4EDE4] dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-6 text-[#0F766E] dark:text-[#F4EDE4]">
        My Books
      </h1>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table className="table w-full text-left">
          
          <thead className="bg-[#0F766E] dark:bg-[#0F766E] text-white">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Book Name</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          
          <tbody>
            {books.map((book, index) => (
              <tr
                key={book._id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">
                  <img
                    src={book.bookImage}
                    alt={book.bookName}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="px-4 py-3 text-gray-800 dark:text-gray-200 font-medium">
                  {book.bookName}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      book.bookStatus === "published"
                        ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100"
                    }`}
                  >
                    {book.bookStatus}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => navigate(`/dashboard/edit-book/${book._id}`)}
                    className="btn btn-sm bg-[#0F766E] text-white hover:bg-[#0D635D] dark:bg-[#0F766E] dark:hover:bg-[#0D635D]"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {books.length === 0 && (
          <p className="text-center py-6 text-gray-500 dark:text-gray-300">
            No books added yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyBooks;
