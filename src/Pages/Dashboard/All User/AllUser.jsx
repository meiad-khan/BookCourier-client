import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../Components/Loading/Loading";

const AllUser = () => {

  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  

  const handleRoleChange = async (user, role) => {
   Swal.fire({
    title: "Are you sure?",
    text: "You want to change the role?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
  }).then(async(result) => {
    if (result.isConfirmed) {
      await axiosSecure.patch(`/users/role/${user._id}`, { role }).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: "Role Assign",
          text:  `${user.displayName} has assigned to ${role}`,
          icon: "success",
        });
      }
    });
    }
  });
  };
   

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div className="min-h-screen bg-gray-10 px-4 py-10">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">
          All Users
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-100  transition"
                >
                  <td className="p-3 text-primary">{index + 1}</td>

                  <td className="p-3 text-primary">
                    {user.displayName || "N/A"}
                  </td>

                  <td className="p-3 text-primary">{user.email}</td>

                  <td className="p-3 capitalize text-primary font-semibold">
                    {user.role || "user"}
                  </td>

                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleRoleChange(user, "librarian")}
                      disabled={user.role === "librarian"}
                      className="px-3 py-1 rounded bg-blue-500 text-white cursor-pointer
                                 hover:bg-blue-600 disabled:opacity-50"
                    >
                      Make Librarian
                    </button>

                    <button
                      onClick={() => handleRoleChange(user, "admin")}
                      disabled={user.role === "admin"}
                      className="px-3 py-1 rounded bg-green-500 text-white cursor-pointer
                                 hover:bg-green-600 disabled:opacity-50"
                    >
                      Make Admin
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

export default AllUser;
