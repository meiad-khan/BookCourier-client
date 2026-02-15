import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import Swal from "sweetalert2";

const ManageBooks = () => {

  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  
  const { data: books = [], isLoading } = useQuery({
    queryKey: ["all-books"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-books");
      return res.data.result;
    },
  });

  
  const statusMutation = useMutation({
    mutationFn: async ({ id, newStatus }) => {
      const res = await axiosSecure.patch(`/all-books/status/${id}`, {
        bookStatus: newStatus,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-books"]);
      Swal.fire("Updated!", "Book status updated", "success");
    },
  });

  
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/all-books/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-books"]);
      Swal.fire("Deleted!", "Book and related orders deleted", "success");
    },
  });

  // Handle Status Change
  const handleStatus = (id, currentStatus) => {
    const newStatus =
      currentStatus === "published" ? "unpublished" : "published";

    statusMutation.mutate({ id, newStatus });
  };

  
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the book and all related orders!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen p-6 bg-[#F4EDE4] dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#0F766E] dark:text-[#F4EDE4]">
          Manage Books
        </h2>

        <div className="overflow-x-auto">
          <table className="table w-full text-gray-800 dark:text-gray-200">
            <thead className="bg-[#0F766E] text-white">
              <tr>
                <th>#</th>
                <th>Book Name</th>
                <th>Author</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book, index) => (
                <tr key={book._id}>
                  <td>{index + 1}</td>
                  <td>{book.bookName}</td>
                  <td>{book.bookAuthor}</td>
                  <td>
                    <span
                      className={`badge ${
                        book.bookStatus === "published"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {book.bookStatus}
                    </span>
                  </td>

                  <td className="flex gap-2">
                    <button
                      onClick={() => handleStatus(book._id, book.bookStatus)}
                      className="btn btn-sm btn-info"
                    >
                      {book.bookStatus === "published"
                        ? "Unpublish"
                        : "Publish"}
                    </button>

                    <button
                      onClick={() => handleDelete(book._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBooks;
