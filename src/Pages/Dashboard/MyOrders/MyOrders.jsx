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
      const res = await axiosSecure.get(`/orders?email=${user?.email}`);
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
  }

  const handlePayment = async (order) => {
    console.log('order is ', { order });
    const paymentInfo = {
      orderId: order._id,
      amount: order.bookPrice,
      customerEmail: order.customerEmail,
      bookName: order.bookName,
    }

     const res = await axiosSecure.post(
       "/create-checkout-session",
       paymentInfo,
     );
     console.log(res.data);
     // window.location.href = res.data.url;
     window.location.assign(res.data.url);
  }
  // console.log('my orders ', { orders });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="overflow-x-auto mt-8">
      <h3 className="text-4xl text-center text-primary mb-6">My Orders</h3>
      {orders.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-lg text-primary">You have not ordered any book</p>
        </div>
      ) : (
        <table className="table table-zebra">
          {/* head */}
          <thead>
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
              <tr key={order._id}>
                <th>{index + 1}</th>
                <td>{order.bookName}</td>
                <td>{new Date(order.createdAt).toDateString()}</td>
                <td>
                  <span
                    className={`badge ${order.orderStatus === "pending" ? "badge-warning" : order.orderStatus === "shipped" ? "badge-info" : order.orderStatus === "delivered" ? "badge-success" : "badge-neutral"}`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge ${order.paymentStatus === "paid" ? "badge-success" : "badge-error"}`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>

                {/* actions */}
                <td className="flex gap-2">
                  {order.orderStatus === "pending" &&
                    order.paymentStatus === "unpaid" && (
                    <button
                      onClick={()=>handlePayment(order)}
                      className="btn btn-sm btn-primary">
                        Pay Now
                      </button>
                    )}

                  {order.orderStatus === "pending" && (
                    <button onClick={()=>handleCancel(order._id)} className="btn btn-sm btn-error">Cancel</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrders;
