import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../Components/Loading/Loading";

const Invoice = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-10">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary dark:text-indigo-400">
          My Invoices
        </h2>

        {payments.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300">
            No payments found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                  <th>#</th>
                  <th>Payment ID</th>
                  <th>Book Name</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment, index) => (
                  <tr
                    key={payment._id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <td className="text-primary">{index + 1}</td>

                    <td className="font-mono text-primary text-sm">
                      {payment.orderId}
                    </td>

                    <td className="text-primary">{payment.bookName}</td>

                    <td className="font-semibold text-green-600">
                      ${payment.amount}
                    </td>

                    <td className="text-primary">
                      {new Date(payment.paidAt).toLocaleDateString()}
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

export default Invoice;
