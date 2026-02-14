// import React from "react";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import useAuth from "../../../hooks/useAuth";
// import { useNavigate } from "react-router";
// import Swal from "sweetalert2";
// import Loading from "../../../Components/Loading/Loading";

// const MyOrders = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const { data: orders = [], isLoading } = useQuery({
//     queryKey: ["my-orders", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/orders?email=${user?.email}`);
//       return res.data;
//     },
//   });

//   const cancelMutation = useMutation({
//     mutationFn: async (id) => {
//       const res = await axiosSecure.patch(`/orders/cancel/${id}`);
//       return res.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["my-orders"]);
//       Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
//     },
//   });

//   const handleCancel = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You want to cancel this order?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Cancel",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         cancelMutation.mutate(id);
//       }
//     });
//   }

//   const handlePayment = async (order) => {
//     console.log('order is ', { order });
//     const paymentInfo = {
//       orderId: order._id,
//       amount: order.bookPrice,
//       customerEmail: order.customerEmail,
//       bookName: order.bookName,
//     }

//      const res = await axiosSecure.post(
//        "/create-checkout-session",
//        paymentInfo,
//      );
//      console.log(res.data);
//      // window.location.href = res.data.url;
//      window.location.assign(res.data.url);
//   }
//   // console.log('my orders ', { orders });

//   if (isLoading) {
//     return <Loading></Loading>;
//   }

//   return (
//     <div className="min-h-screen transition-colors duration-300">
//       <div className="overflow-x-auto mt-8 shadow-lg rounded-2xl p-6">
//         <h3 className="text-4xl text-center text-primary mb-6">My Orders</h3>
//         {orders.length === 0 ? (
//           <div className="text-center mt-10">
//             <p className="text-lg text-primary">
//               You have not ordered any book
//             </p>
//           </div>
//         ) : (
//           <table className="table table-zebra">
//             {/* head */}
//             <thead>
//               <tr>
//                 <th>SL</th>
//                 <th>Book Title</th>
//                 <th>Order Date</th>
//                 <th>Status</th>
//                 <th>Payment</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order, index) => (
//                 <tr key={order._id}>
//                   <th>{index + 1}</th>
//                   <td>{order.bookName}</td>
//                   <td>{new Date(order.createdAt).toDateString()}</td>
//                   <td>
//                     <span
//                       className={`badge ${order.orderStatus === "pending" ? "badge-warning" : order.orderStatus === "shipped" ? "badge-info" : order.orderStatus === "delivered" ? "badge-success" : "badge-neutral"}`}
//                     >
//                       {order.orderStatus}
//                     </span>
//                   </td>
//                   <td>
//                     <span
//                       className={`badge ${order.paymentStatus === "paid" ? "badge-success" : "badge-error"}`}
//                     >
//                       {order.paymentStatus}
//                     </span>
//                   </td>

//                   {/* actions */}
//                   <td className="flex gap-2">
//                     {order.orderStatus === "pending" &&
//                       order.paymentStatus === "unpaid" && (
//                         <button
//                           onClick={() => handlePayment(order)}
//                           className="btn btn-sm btn-primary"
//                         >
//                           Pay Now
//                         </button>
//                       )}

//                     {order.orderStatus === "pending" && (
//                       <button
//                         onClick={() => handleCancel(order._id)}
//                         className="btn btn-sm btn-error"
//                       >
//                         Cancel
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyOrders;

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
    <div className="min-h-screen transition-colors duration-300 bg-[#F4EDE4] dark:bg-gray-900">
      <div className="overflow-x-auto mt-8 shadow-lg rounded-2xl p-6 bg-white dark:bg-gray-800 transition-colors duration-300">
        <h3 className="text-4xl text-center text-[#0F766E] dark:text-[#F4EDE4] mb-6 font-bold">
          My Orders
        </h3>

        {orders.length === 0 ? (
          <div className="text-center mt-10">
            <p className="text-lg text-[#0F766E] dark:text-[#F4EDE4]">
              You have not ordered any book
            </p>
          </div>
        ) : (
          <table className="table w-full text-gray-800 dark:text-gray-200">
            {/* head */}
            <thead className="bg-[#0F766E] dark:bg-[#0F766E] text-white">
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
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <th>{index + 1}</th>
                  <td>{order.bookName}</td>
                  <td>{new Date(order.createdAt).toDateString()}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.orderStatus === "pending"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100"
                          : order.orderStatus === "shipped"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100"
                            : order.orderStatus === "delivered"
                              ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
                              : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.paymentStatus === "paid"
                          ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
                          : "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100"
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
                          className="btn btn-sm bg-[#0F766E] text-white hover:bg-[#0D635D] dark:bg-[#0F766E] dark:hover:bg-[#0D635D]"
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

