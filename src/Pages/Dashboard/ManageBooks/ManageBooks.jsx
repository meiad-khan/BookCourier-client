import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import Swal from "sweetalert2";

const ManageBooks = () => {

  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  
  const { data: books = [], isLoading, refetch } = useQuery({
    queryKey: ["all-books"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-books");
      return res.data;
    },
  });

  
  const statusMutation = useMutation({
    mutationFn: async ({ id, newStatus }) => {
      const newBook = {
        bookStatus:newStatus,
      }
      const res = await axiosSecure.patch(`/all-books/${id}`, newBook);
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

  
  const handleStatus = (id, currentStatus) => {
    const newStatus =
      currentStatus === "Published" ? "Unpublished" : "Published";

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
    <div className="min-h-screen p-6 bg-base-200">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#0F766E] ">
          Manage Books
        </h2>

        <div className="overflow-x-auto">
          <table className="table w-full text-gray-800 ">
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
                        book.bookStatus === "Published"
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
                      {book.bookStatus === "Published"
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
