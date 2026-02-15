import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Loading from "../../../Components/Loading/Loading";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["my-orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/orders/customer?email=${user?.email}`,
      );
      return res.data;
    },
  });

  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/orders/cancel/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["my-orders"]);
      Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
    },
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelMutation.mutate(id);
      }
    });
  };

  const handlePayment = async (order) => {
    const paymentInfo = {
      orderId: order._id,
      amount: order.bookPrice,
      customerEmail: order.customerEmail,
      bookName: order.bookName,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    window.location.assign(res.data.url);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen transition-colors duration-300 bg-base-200">
      <div className="overflow-x-auto mt-8 shadow-lg rounded-2xl p-6 bg-white transition-colors duration-300">
        <h3 className="text-4xl text-center text-[#0F766E] mb-6 font-bold">
          My Orders
        </h3>

        {orders.length === 0 ? (
          <div className="text-center mt-10">
            <p className="text-lg text-[#0F766E]">
              You have not ordered any book
            </p>
          </div>
        ) : (
          <table className="table w-full text-gray-800">
            {/* head */}
            <thead className="bg-[#0F766E] text-white">
              <tr>
                <th>SL</th>
                <th>Book Title</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <th>{index + 1}</th>
                  <td>{order.bookName}</td>
                  <td>{new Date(order.createdAt).toDateString()}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.orderStatus === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.orderStatus === "shipped"
                            ? "bg-blue-100 text-blue-700"
                            : order.orderStatus === "delivered"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.paymentStatus === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>

                  <td className="flex gap-2">
                    {order.orderStatus === "pending" &&
                      order.paymentStatus === "unpaid" && (
                        <button
                          onClick={() => handlePayment(order)}
                          className="btn btn-sm bg-[#0F766E] text-white hover:bg-[#0D635D]"
                        >
                          Pay Now
                        </button>
                      )}

                    {order.orderStatus === "pending" && (
                      <button
                        onClick={() => handleCancel(order._id)}
                        className="btn btn-sm btn-error"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyOrders;

