import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../Components/Loading/Loading";

const Orders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["librarian-orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?librarianEmail=${user.email}`);
      return res.data;
    },
  });

  const handleStatusChange = async (id, newStatus) => {
    await axiosSecure.patch(`/orders/${id}`, {
      orderStatus: newStatus,
    });
    refetch();
  };

  const handleCancel = async (id) => {
    await axiosSecure.delete(`/orders/${id}`);
    refetch();
  };

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-10">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600 dark:text-indigo-400">
          Book Orders
        </h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300">
            No orders found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Book</th>
                  <th className="p-3 text-left">Buyer</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={order._id}
                    className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <td className="p-3 text-primary">{index + 1}</td>

                    <td className="p-3 font-semibold text-primary">
                      {order.bookName}
                    </td>

                    <td className="p-3 text-sm text-primary">
                      {order.customerEmail}
                    </td>

                    <td className="p-3 font-semibold text-green-600">
                      ${order.bookPrice}
                    </td>

                    <td className="p-3">
                      <select
                        value={order.orderStatus}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="px-2 py-1 rounded border 
                                   bg-white dark:bg-gray-700 
                                   border-gray-300 dark:border-gray-600
                                   text-gray-800 dark:text-white"
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>

                    <td className="p-3 text-sm text-primary">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() => handleCancel(order._id)}
                        className="px-3 py-1 rounded bg-red-500 text-white cursor-pointer hover:bg-red-600 transition"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
